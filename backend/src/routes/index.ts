import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';

const router = Router();

router.get(
	'/',
	asyncWrap(async (req: Request, res: Response) => {
		const cursor = req.query.cursor;
		const [rows] = await database.query<any>(
			`SELECT MIN(id) as min from posts`
		);
		const min = rows[0].min;
		console.log(cursor);
		if (cursor == 'null') {
			const [rows] = await database.query<any>(
				`SELECT id,user_id, preview_text, title, created_at FROM posts order by id DESC LIMIT 3`
			);
			res.send({
				posts: rows,
				nextCursor: rows[rows.length - 1].id > min && rows[rows.length - 1].id,
			});
		} else {
			const [rows] = await database.query<any>(
				`SELECT id,user_id, preview_text, title, created_at FROM posts where id < ${cursor} order by id DESC LIMIT 3`
			);
			res.send({
				posts: rows,
				nextCursor: rows[rows.length - 1].id > min && rows[rows.length - 1].id,
			});
		}
	})
);

export default router;
