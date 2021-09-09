import { Router } from 'express';
import database from '../config/database';
import * as jwt from 'jsonwebtoken';
import { asyncWrap } from '../utils/asyncWrapper';
import { FieldPacket, RowDataPacket } from 'mysql2';

interface UserQueryProps extends RowDataPacket {
	id: string;
	password: string;
}

const router = Router();
router.get('/', (req, res) => {});

router.post(
	'/',
	asyncWrap(async (req, res) => {
		const [rows]: [UserQueryProps[], FieldPacket[]] = await database.query<
			UserQueryProps[]
		>(
			`SELECT id FROM Users WHERE id='${req.body.username}' and password = '${req.body.password}'`
		);
		if (!rows.length) {
			res.json({ success: false });
		} else {
			let token = jwt.sign(rows[0].id, process.env.TOKEN_SECRET);
			res.json({ success: true, token });
		}
	})
);

export default router;
