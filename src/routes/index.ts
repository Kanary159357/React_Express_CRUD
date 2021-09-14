import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';

const router = Router();

router.get(
	'/',
	asyncWrap(async (req: Request, res: Response) => {
		const [rows] = await database.query<any>(
			`SELECT id,user_id, preview_text, title, created_at FROM posts`
		);

		console.log(rows);
		res.send(rows);
	})
);

export default router;
