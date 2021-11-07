import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';
import verifyToken from '../middleware/verifyToken';

const router = Router();

interface ArticleProps {
	id: string;
	post: any;
	preview: string;
	title: string;
}
router.get(
	'/:id',
	asyncWrap(async (req: Request<ArticleProps>, res: Response) => {
		const id = req.params.id;
		try {
			const [row] = await database.query(
				`SELECT * FROM POSTS WHERE ID = ${id};`
			);
			res.send(row);
		} catch (e) {
			console.log(e);
			res.status(400).send('실패데수네~');
		}
	})
);
router.post(
	'/:id',
	verifyToken,
	asyncWrap(async (req: Request, res) => {
		const { title, content, preview_text } = req.body;
		try {
			const data = await database.query(
				`UPDATE POSTS SET content = '${content}', preview_text='${preview_text}', updated_at = NOW(),  title='${title}' WHERE id ='${req.params.id}' and user_id= '${req.user.id}'`
			);
			res.send(data);
		} catch (e) {
			console.log(e);
			res.status(400).send('실패데수네~');
		}
	})
);
router.delete(
	'/:id',
	verifyToken,
	asyncWrap(async (req: Request<ArticleProps>, res) => {
		const id = req.user;
		try {
			const data = await database.query(
				`DELETE FROM POSTS WHERE id ='${req.params.id}' AND user_id = '${id}'`
			);
			res.send(data);
		} catch (e) {
			console.log(e);
			res.status(400).send('실패데수네~');
		}
	})
);
export default router;
