import { Request, Response, Router } from 'express';
import database from '../config/database';
import * as jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import { asyncWrap } from '../utils/asyncWrapper';
import { RowDataPacket } from 'mysql2';
import redisClient from '../config/redis';
import { getNewAccessToken } from '../utils/jwt-utils';
import verifyToken from '../middleware/verifyToken';
import { compare } from 'bcryptjs';
interface UserQueryProps extends RowDataPacket {
	id: string;
	password: string;
	username: string;
}

const router = Router();

router.get(
	'/',
	verifyToken,
	asyncWrap(
		async (req: Request<unknown, unknown, UserQueryProps>, res: Response) => {
			try {
				const [rows] = await database.query<UserQueryProps[]>(
					`SELECT id, username FROM users WHERE id='${req.user.id}'`
				);
				if (!rows.length) {
					return res
						.status(404)
						.send({ success: false, message: 'getUser failed' });
				} else {
					return res.send({
						success: true,
						username: rows[0].username,
						id: rows[0].id,
					});
				}
			} catch {
				res.status(400).send({ success: false, message: 'getUser failed' });
			}
		}
	)
);

router.post(
	'/',
	asyncWrap(
		async (req: Request<unknown, unknown, UserQueryProps>, res: Response) => {
			try {
				const [rows] = await database.query<UserQueryProps[]>(
					`SELECT id, username, password FROM users WHERE id='${req.body.id}'`
				);

				if (!rows.length || !rows[0])
					return res
						.status(400)
						.send({ success: false, message: 'Login failed' });
				const comparison = await compare(req.body.password, rows[0].password);
				if (!comparison) {
					return res.json({ success: false });
				} else {
					const accesstoken = getNewAccessToken(rows[0].id);
					const refreshToken = jwt.sign(
						{ id: rows[0].id, username: rows[0].username },
						process.env.TOKEN_SECRET,
						{
							algorithm: 'HS256',
							expiresIn: '14d',
						}
					);
					redisClient.set(rows[0].id, refreshToken);
					redisClient.expire(rows[0].id, 60 * 60 * 24 * 7);
					res.header({
						'Set-Cookie': [
							cookie.serialize('refreshToken', refreshToken, {
								httpOnly: true,
								maxAge: 60 * 60 * 24 * 7, // 7 days
								sameSite: true,
								path: '/',
							}),
						],
					});
					return res.send({
						success: true,
						token: accesstoken,
						id: rows[0].id,
						username: rows[0].username,
					});
				}
			} catch (e) {
				return res.status(400).send({ error: e, message: 'Login failed' });
			}
		}
	)
);

export default router;
