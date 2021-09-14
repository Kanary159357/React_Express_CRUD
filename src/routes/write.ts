import { Request, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';

const router = Router();

interface WriteProps {
	id: string;
	post: any;
	preview: string;
	title: string;
}
router.post(
	'/',
	asyncWrap(async (req: Request<WriteProps>, res) => {
		const { id, post, preview, title } = req.body;
		console.log(preview);
		try {
			await database.query(
				`INSERT INTO posts(user_id, post, preview_text,title) values ('${id}','${JSON.stringify(
					post
				)}', '${preview}', '${title}');`
			);
		} catch (e) {
			console.log(e);
			res.status(400).send('실패데수네~');
		}
	})
);

export default router;
