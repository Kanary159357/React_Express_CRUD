import { Request, Response, Router } from 'express';
import database from '../config/database';
import verifyToken from '../middleware/verifyToken';
import { AccountProps } from '../types/PostType';
import { asyncWrap } from '../utils/asyncWrapper';

const router = Router();

router.get(
	'/',
	verifyToken,
	asyncWrap(async (req: Request, res: Response) => {
		try {
			const [rows] = await database.query<AccountProps[]>(
				`SELECT id, username, registration_date  FROM users WHERE id='${req.user.id}'`
			);
			return res.send(rows[0]);
		} catch (e) {
			return res.status(401).send('Error');
		}
	})
);
export default router;
