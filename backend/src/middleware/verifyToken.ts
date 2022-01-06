import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AccessTokenType } from '../types/TokenType';

const verifyToken = (req: Request, res: Response, next: Function) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		return res.status(401).send('No authHeader');
	}
	const token = authHeader.replace(/'/g, ' ').trim().split(' ')[1];

	try {
		const decoded = verify(token, process.env.TOKEN_SECRET);
		req.user = decoded as AccessTokenType;
	} catch (err) {
		return res.status(401).send({
			authHeader,
			token,
			err,
		});
	}
	return next();
};

export default verifyToken;
