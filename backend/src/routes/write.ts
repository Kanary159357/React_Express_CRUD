import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';
import verifyToken from '../middleware/verifyToken';
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
		const { content, preview, title } = req.body;
		const { id } = req.user;
		try {
			await database.query(
				`INSERT INTO posts(user_id, content, preview_text,title) values ('${id}','${content}', '${preview}', '${title}');`
			);
			res.status(200).send({ message: 'Successfully Written' });
		} catch (e) {
			console.log(e);
			res.status(400).send({ message: 'Write Fail', error: e });
		}
	})
);

export default router;
