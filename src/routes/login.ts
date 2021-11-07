import { Request, Response, Router } from 'express';
import database from '../config/database';
import * as jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import { asyncWrap } from '../utils/asyncWrapper';
import { FieldPacket, RowDataPacket } from 'mysql2';
import redisClient from '../config/redis';
import { getNewAccessToken } from '../utils/jwt-utils';
import verifyToken from '../middleware/verifyToken';
import { idText } from 'typescript';
import { compare } from 'bcrypt';
interface UserQueryProps extends RowDataPacket {
	id: string;
	password: string;
	username: string;
}

const router = Router();

router.get(
	'/',
	verifyToken,
	asyncWrap(async (req, res) => {
		const [rows]: [UserQueryProps[], FieldPacket[]] = await database.query<
			UserQueryProps[]
		>(`SELECT id, username FROM Users WHERE id='${req.user.id}'`);
		if (!rows.length) {
			console.log('false');
			return res.json({ success: false });
		} else {
			return res.send({
				success: true,
				username: rows[0].username,
				id: rows[0].id,
			});
		}
	})
);

router.post(
	'/',
	asyncWrap(async (req: Request<UserQueryProps>, res: Response) => {
		const [rows]: [UserQueryProps[], FieldPacket[]] = await database.query<
			UserQueryProps[]
		>(`SELECT id, username, password FROM Users WHERE id='${req.body.id}'`);
		console.log(req.body, rows[0]);
		const comparison = await compare(req.body.password, rows[0].password);
		console.log(comparison);
		if (!rows.length) {
			console.log('false');
			return res.json({ success: false });
		} else {
			let accesstoken = getNewAccessToken(rows[0].id);
			let refreshToken = jwt.sign(
				{ id: rows[0].id, username: rows[0].username },
				process.env.TOKEN_SECRET,
				{
					algorithm: 'HS256',
					expiresIn: '14d',
				}
			);
			redisClient.set(rows[0].id, refreshToken);
			res.header({
				'Set-Cookie': cookie.serialize('refreshToken', refreshToken, {
					httpOnly: true,
					maxAge: 120 * 60 * 60, // 7 days
					sameSite: true,
					path: '/',
				}),
			});
			return res.send({
				success: true,
				token: accesstoken,
				id: rows[0].id,
				username: rows[0].username,
			});
		}
	})
);

export default router;
