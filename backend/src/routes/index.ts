import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import database from '../config/database';
import { RowDataPacket } from 'mysql2';

const router = Router();

interface Post extends RowDataPacket {
	id: string;
	user_id: string;
	preview_text: string;
	title: string;
	created_at: Date;
}

router.get(
	'/',
	asyncWrap(async (req: Request, res: Response) => {
		const baseMinMaxQuery = `SELECT MIN(id) as min, MAX(id) as max from posts`;
		const basePostQuery = `SELECT id,user_id, preview_text, title, created_at FROM posts`;
		const query = Object.entries(req.query).filter(([key, value]) => {
			return value !== 'null' && value !== 'undefined' && key !== 'order';
		});
		const order = req.query.order || 'desc';
		const orderQuery = ` order by id ${order} LIMIT 3`;
		const whereQuery =
			query.length !== 0
				? query.reduce((acc, cur, i) => {
						const [k, v] = cur;
						let str = '';
						if (k == 'user_id') {
							str = `${k}='${v}'`;
						} else if (order === 'asc') {
							str = `${k}>${v}`;
						} else {
							str = `${k}<${v}`;
						}
						if (i !== 0) {
							str = ' AND ' + str;
						}
						return acc + str;
				  }, ' WHERE ')
				: '';

		const MinMaxQuery = baseMinMaxQuery + whereQuery;
		const PostQuery = basePostQuery + whereQuery + orderQuery;
		try {
			const [minmaxRows] = await database.query<Post[]>(MinMaxQuery);
			const { min, max } = minmaxRows[0];
			const [rows] = await database.query<Post[]>(PostQuery);
			const nextCursor =
				rows.length == 0
					? undefined
					: order === 'desc'
					? rows[rows.length - 1].id > min && rows[rows.length - 1].id
					: rows[rows.length - 1].id < max && rows[rows.length - 1].id;
			res.send({
				posts: rows,
				nextCursor,
			});
		} catch (e) {
			res.send({ message: PostQuery });
		}
	})
);

export default router;
