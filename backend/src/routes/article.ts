import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';
import verifyToken from '../middleware/verifyToken';
import { ArticleProps } from '../types/PostType';

const router = Router();

router.get(
	'/:id',
	asyncWrap(
		async (
			req: Request<{ id: string }, unknown, ArticleProps>,
			res: Response
		) => {
			const id = req.params.id;
			try {
				const [row] = await database.query<ArticleProps[]>(
					`SELECT * FROM posts WHERE id = ${id};`
				);
				res.send(row[0]);
			} catch (e) {
				console.log(e);
				res.status(400).send({ error: e, message: 'getArticle Fail' });
			}
		}
	)
);
router.put(
	'/:id',
	verifyToken,
	asyncWrap(async (req: Request<{ id: string }>, res: Response) => {
		const { title, content, preview_text } = req.body;
		try {
			await database.query(
				`UPDATE posts SET content = '${content}', preview_text='${preview_text}',  title='${title}' WHERE id ='${req.params.id}' and user_id= '${req.user.id}'`
			);
			res.send({ message: 'Update Success' });
		} catch (e) {
			console.log(e);
			res.status(400).send({ error: e, message: 'Update Fail' });
		}
	})
);
router.delete(
	'/:id',
	verifyToken,
	asyncWrap(
		async (
			req: Request<{ id: string }, unknown, ArticleProps>,
			res: Response
		) => {
			const { id } = req.user;
			try {
				await database.query(
					`DELETE FROM posts WHERE id ='${req.params.id}' AND user_id = '${id}'`
				);
				res.send({ message: 'Delete Success' });
			} catch (e) {
				console.log(e);
				res.status(400).send({ message: 'Delete Fail', error: e });
			}
		}
	)
);
export default router;
