import { Router } from 'express';
import { FieldPacket } from 'mysql2';
import database from '../config/database';
import verifyToken from '../middleware/verifyToken';
import { asyncWrap } from '../utils/asyncWrapper';

const router = Router();

router.get(
	'/',
	verifyToken,
	asyncWrap(async (req, res) => {
		try {
			const [rows]: [any, FieldPacket[]] = await database.query<any>(
				`SELECT id, username, registration_date  FROM users WHERE id='${req.user.id}'`
			);
			return res.send(rows[0]);
		} catch (e) {
			return res.status(401).send('Error');
		}
	})
);
export default router;
