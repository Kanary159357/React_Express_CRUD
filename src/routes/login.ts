import { Router } from 'express';
import database from '../config/database';
import * as jwt from 'jsonwebtoken';
import { asyncWrap } from '../utils/asyncWrapper';
const router = Router();
router.get('/', (req, res) => {});

router.post(
	'/',
	asyncWrap(async (req, res) => {
		const results = await database.query(
			`SELECT * FROM Users WHERE id='${req.body.username}' and password = '${req.body.password}'`
		);
		console.log(results);

		/*
		if (rows) {
			let token = jwt.sign(rows[0], process.env.TOKEN_SECRET, {
				expiresIn: '1d',
			});
			res.json(token);
		} else {
			res.send('아아디, 혹은 비밀번호가 잘못되었습니다');
		}*/
	})
);

module.exports = router;
