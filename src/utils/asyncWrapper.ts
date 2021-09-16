import { Request, Response } from 'express';

export function asyncWrap(fn: Function) {
	return async function (req: Request, res: Response, next: Function) {
		try {
			await fn(req, res, next);
		} catch (err) {
			next(err);
		}
	};
}
