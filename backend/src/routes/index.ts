import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';

const router = Router();

router.get(
	'/',
	asyncWrap(async (req: Request, res: Response) => {
		const baseMinQuery = `SELECT MIN(id) as min from posts`;
		const basePostQuery = `SELECT id,user_id, preview_text, title, created_at FROM posts`;
		const query = Object.entries(req.query).filter(([key, value]) => {
			return value !== 'null' && value !== 'undefined';
		});
		console.log(query, req.query);
		const whereQuery =
			query.length !== 0
				? query.reduce((acc, cur, i) => {
						const large = [];
						const small = ['id'];
						const [k, v] = cur;
						let str = '';
						if (large.includes(k)) {
							str = `${k}>${v}`;
						} else if (small.includes(k)) {
							str = `${k}<${v}`;
						} else {
							str = `${k}='${v}'`;
						}
						if (i !== 0) {
							str = ' AND ' + str;
						}
						return acc + str;
				  }, ' WHERE ')
				: '';
		const orderQuery = ` order by id DESC LIMIT 3`;
		const MinQuery = baseMinQuery + whereQuery;
		const PostQuery = basePostQuery + whereQuery + orderQuery;

		const [minRows] = await database.query<any>(MinQuery);
		const min = minRows[0].min;

		const [rows] = await database.query<any>(PostQuery);
		res.send({
			posts: rows,
			nextCursor:
				rows.length !== 0
					? rows[rows.length - 1].id > min && rows[rows.length - 1].id
					: undefined,
		});
	})
);

export default router;
