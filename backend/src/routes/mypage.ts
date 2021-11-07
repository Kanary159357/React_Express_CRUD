import { Request, Response, Router } from 'express';
import { FieldPacket } from 'mysql2';
import database from '../config/database';
import verifyToken from '../middleware/verifyToken';
import { asyncWrap } from '../utils/asyncWrapper';

const router = Router();

router.get(
	'/',
	verifyToken,
	asyncWrap(async (req: Request, res: Response) => {
		try {
			const [rows]: [any, FieldPacket[]] = await database.query<any>(
				`SELECT id, user_id, created_at, preview_text, title FROM Posts WHERE user_id='${req.user.id}'`
			);
			return res.send(rows);
		} catch (e) {
			return res.status(401).send('Error');
		}
	})
);
export default router;
