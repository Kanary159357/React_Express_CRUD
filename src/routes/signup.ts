import { Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';

import { Request, Response } from 'express';
const router = Router();

interface InputProps {
	id: string;
	password: string;
	username: string;
}

router.post(
	'/',
	asyncWrap(async (req: Request<InputProps>, res: Response) => {
		const date = new Date();
		const { id, password, username } = req.body;
		date.setHours(date.getHours() + 9);
		const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

		console.log(formattedDate);
		console.log(req.body);
		try {
			await database.query(
				`INSERT INTO users values ('${id}', '${password}', '${username}', '${formattedDate}');`
			);
		} catch (e) {
			res.status(400).send('실패데수네~');
		}
	})
);
router.get(
	'/checkId/:id',
	asyncWrap(async (req: Request<InputProps>, res: Response) => {
		const id = req.params.id;
		console.log({ id });
		try {
			const [rows] = await database.query(
				`SELECT count(id) as cnt FROM users WHERE id='${id}';`
			);
			res.send(rows);
		} catch (e) {
			res.status(400).send('실패데수네~');
		}
	})
);
export default router;
