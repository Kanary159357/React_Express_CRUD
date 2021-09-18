import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const config = process.env;
const verifyToken = (req: Request, res: Response, next: Function) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		return res.status(403).send('No authHeader');
	}
	try {
		const token = authHeader.split(' ')[1];
		const decoded = verify(token, process.env.TOKEN_SECRET as string);
		req.user = decoded as string;
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
	return next();
};

export default verifyToken;
