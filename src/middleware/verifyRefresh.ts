import { Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { promisify } from 'util';
import redisClient from '../config/redis';
import {
	verifyToken,
	verifyRefreshToken,
	getNewAccessToken,
} from '../utils/jwt-utils';

const config = process.env;
const verifyRefeshToken = async (
	req: Request,
	res: Response,
	next: Function
) => {
	if (!req.headers.authorization || !req.headers.refresh) {
		return res.status(403).send('No authHeader');
	}
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = verify(token, process.env.TOKEN_SECRET);
		if (!decoded) {
			res.status(401).send({
				ok: false,
				message: 'No authorized!',
			});
		}

		const authResult = verifyToken(token);
		const refreshResult = await verifyRefreshToken(token, decoded as string);

		if (!authResult.ok && authResult.message === 'jwt expired') {
			if (!refreshResult.ok) {
				res.status(401).send({
					ok: false,
					message: 'No authorized!',
				});
			} else {
				const newToken = getNewAccessToken(decoded as string);
				res.json({
					success: true,
					token: newToken,
				});
			}
		} else {
			res.status(400).send('error');
		}
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
	return next();
};

export default verifyRefeshToken;
