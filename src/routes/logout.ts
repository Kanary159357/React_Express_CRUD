import { Request, Response, Router } from 'express';
import { asyncWrap } from '../utils/asyncWrapper';
import { parse } from 'cookie';
import redisClient from '../config/redis';
import verifyToken from '../middleware/verifyToken';
const router = Router();

router.delete(
	'/',
	verifyToken,
	asyncWrap((req: Request, res: Response) => {
		try {
			redisClient.del(req.user.id);
			return res.send('Logout');
		} catch (e) {
			return res.status(404).send('logout Failed');
		}
	})
);

export default router;
