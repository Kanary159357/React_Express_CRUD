import { JsonWebTokenError, JwtPayload, sign, verify } from 'jsonwebtoken';
import { promisify } from 'util';
import redisClient from '../config/redis';

export const getNewAccessToken = (id: string) => {
	return sign(id, process.env.TOKEN_SECRET);
};

export const verifyToken = (token: string) => {
	try {
		const result = verify(token, process.env.TOKEN_SECRET);
		return {
			ok: true,
			id: result,
		};
	} catch (e) {
		return {
			ok: false,
			message: e.message,
		};
	}
};

export const verifyRefreshToken = async (token: string, id: string) => {
	const getAsync = promisify(redisClient.get).bind(redisClient);

	try {
		const data = await getAsync(id); // refresh token 가져오기
		if (token === data) {
			return verifyToken(token);
		} else {
			return { ok: false };
		}
	} catch (err) {
		return { ok: false };
	}
};
