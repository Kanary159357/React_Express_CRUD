import { Request, Router } from 'express';
import database from '../config/database';
import * as jwt from 'jsonwebtoken';
import { asyncWrap } from '../utils/asyncWrapper';
import { FieldPacket, RowDataPacket } from 'mysql2';

interface UserQueryProps extends RowDataPacket {
	id: string;
	password: string;
	username: string;
}

const router = Router();

router.post(
	'/',
	asyncWrap(async (req: Request<UserQueryProps>, res) => {
		console.log(req.body);
		const [rows]: [UserQueryProps[], FieldPacket[]] = await database.query<
			UserQueryProps[]
		>(
			`SELECT id, username FROM Users WHERE id='${req.body.id}' and password = '${req.body.password}'`
		);
		console.log(rows);
		if (!rows.length) {
			res.json({ success: false });
		} else {
			let token = jwt.sign(rows[0].id, process.env.TOKEN_SECRET);
			res.json({
				success: true,
				token,
				username: rows[0].username,
			});
		}
	})
);

export default router;
