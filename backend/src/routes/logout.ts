import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import redisClient from '../config/redis';
import verifyToken from '../middleware/verifyToken';
import { promisify } from 'util';
const router = Router();

router.delete(
	'/',
	verifyToken,
	asyncWrap(async (req: Request, res: Response) => {
		const delAsync = promisify(redisClient.del).bind(redisClient);

		try {
			await delAsync(req.user.id);
			return res.send({ message: 'Logout Success' });
		} catch (e) {
			return res.status(404).send({ message: 'Logout Failed' });
		}
	})
);

export default router;
