import { Request, Response, Router } from 'express';
import database from '../config/database';
import * as jwt from 'jsonwebtoken';
import { asyncWrap } from '../utils/asyncWrapper';
import { FieldPacket, RowDataPacket } from 'mysql2';
import redisClient from '../config/redis';
import { getNewAccessToken } from '../utils/jwt-utils';
interface UserQueryProps extends RowDataPacket {
	id: string;
	password: string;
	username: string;
}

const router = Router();

router.post(
	'/',
	asyncWrap(async (req: Request<UserQueryProps>, res: Response) => {
		console.log(req.body);
		const [rows]: [UserQueryProps[], FieldPacket[]] = await database.query<
			UserQueryProps[]
		>(
			`SELECT id, username FROM Users WHERE id='${req.body.id}' and password = '${req.body.password}'`
		);
		console.log(rows);
		if (!rows.length) {
			res.json({ success: false });
		} else {
			let accesstoken = getNewAccessToken(rows[0].id);
			let refreshToken = jwt.sign({}, process.env.TOKEN_SECRET, {
				algorithm: 'HS256',
				expiresIn: '14d',
			});
			redisClient.set(rows[0].id, refreshToken);
			res.json({
				success: true,
				token: accesstoken,
				refreshToken,
				username: rows[0].username,
			});
		}
	})
);

export default router;
