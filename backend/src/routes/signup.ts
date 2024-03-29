import { Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';

import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { RowDataPacket } from 'mysql2';
const router = Router();

interface InputProps {
	id: string;
	password: string;
	username: string;
}

interface CountProps extends RowDataPacket {
	cnt: number;
}

router.post(
	'/',
	asyncWrap(
		async (req: Request<unknown, unknown, InputProps>, res: Response) => {
			const date = new Date();
			const { id, password, username } = req.body;
			date.setHours(date.getHours() + 9);
			const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
			const encryptPassword = await hash(password, 1);
			try {
				await database.query(
					`INSERT INTO users values ('${id}', '${encryptPassword}', '${username}', '${formattedDate}');`
				);
				res.send({ message: 'Successfully registered' });
			} catch (e) {
				res.status(400).send({ message: 'Registeration Fail', error: e });
			}
		}
	)
);
router.get(
	'/:id',
	asyncWrap(async (req: Request<InputProps>, res: Response) => {
		const id = req.params.id;
		try {
			const [rows] = await database.query<CountProps[]>(
				`SELECT count(id) as cnt FROM users WHERE id='${id}';`
			);
			res.send({ available: Boolean(rows[0].cnt) });
		} catch (e) {
			res.status(400).send({ error: e, message: 'getCoundId Fail' });
		}
	})
);
export default router;
