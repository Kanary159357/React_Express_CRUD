import { JsonWebTokenError, JwtPayload, sign, verify } from 'jsonwebtoken';
import { promisify } from 'util';
import redisClient from '../config/redis';
import { AccessTokenType } from '../types/TokenType';
require('dotenv').config();

export const getNewAccessToken = (id: string) => {
	return sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60s' });
};

export const getVerifiedToken = (token: string) => {
	try {
		const result = verify(token, process.env.TOKEN_SECRET) as AccessTokenType;
		return {
			ok: true,
			id: result.id,
		};
	} catch (e) {
		return {
			ok: false,
			message: e.message,
		};
	}
};

export const getVerifiedRefreshToken = async (token: string, id: string) => {
	const getAsync = promisify(redisClient.get).bind(redisClient);

	try {
		const data = await getAsync(id); // refresh token 가져오기
		if (token === data) {
			return getVerifiedToken(token);
		} else {
			return { ok: false, id, token, data };
		}
	} catch (err) {
		return { ok: false, err };
	}
};
