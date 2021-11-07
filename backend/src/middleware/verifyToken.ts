import { Request, Response } from 'express';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import { AccessTokenType } from '../types/TokenType';
import { getVerifiedToken } from '../utils/jwt-utils';

const config = process.env;
const verifyToken = (req: Request, res: Response, next: Function) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		return res.status(401).send('No authHeader');
	}
	try {
		const token = authHeader.split(' ')[1];
		const decoded = verify(token, process.env.TOKEN_SECRET);
		req.user = decoded as AccessTokenType;
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
	return next();
};

export default verifyToken;