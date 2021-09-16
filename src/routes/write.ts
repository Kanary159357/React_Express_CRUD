import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';
import verifyToken from '../middleware/auth';
const router = Router();

interface WriteProps {
	id: string;
	post: any;
	preview: string;
	title: string;
}
router.post(
	'/',
	verifyToken,
	asyncWrap(async (req: Request<WriteProps>, res: Response) => {
		const { id, content, preview, title } = req.body;
		try {
			/*await database.query(
				`INSERT INTO posts(user_id, content, preview_text,title) values ('${id}','${content}', '${preview}', '${title}');`
			);*/
		} catch (e) {
			console.log(e);
			res.status(400).send('실패데수네~');
		}
	})
);

export default router;
