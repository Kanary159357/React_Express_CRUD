import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import {
	getVerifiedToken,
	getVerifiedRefreshToken,
	getNewAccessToken,
} from '../utils/jwt-utils';

const verifyRefeshToken: RequestHandler = async (req, res, next) => {
	if (!req.headers.authorization || !req.headers.refresh) {
		return res.status(401).send('No authHeader');
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

		const authResult = getVerifiedToken(token);
		const refreshResult = await getVerifiedRefreshToken(
			token,
			decoded as string
		);

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
