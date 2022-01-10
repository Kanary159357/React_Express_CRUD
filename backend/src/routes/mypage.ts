import { Request, Response, Router } from 'express';
import { RowDataPacket } from 'mysql2';
import database from '../config/database';
import verifyToken from '../middleware/verifyToken';
import { asyncWrap } from '../utils/asyncWrapper';

const router = Router();

interface PostProps extends RowDataPacket {
	id: string;
	user_id: string;
	created_at: Date;
	preview_text: string;
	title: string;
}

router.get(
	'/',
	verifyToken,
	asyncWrap(async (req: Request, res: Response) => {
		try {
			const [rows] = await database.query<PostProps[]>(
				`SELECT id, user_id, created_at, preview_text, title FROM posts WHERE user_id='${req.user.id}'`
			);
			return res.send(rows);
		} catch (e) {
			return res.status(401).send({ error: e, message: 'getMyPage fail' });
		}
	})
);
export default router;
