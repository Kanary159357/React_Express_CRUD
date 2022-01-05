import { Request, Response, Router } from 'express';
import { AccessTokenType } from '../types/TokenType';
import { asyncWrap } from '../utils/asyncWrapper';
import { getNewAccessToken, getVerifiedRefreshToken } from '../utils/jwt-utils';
import { decode } from 'jsonwebtoken';
import { parse } from 'cookie';
const router = Router();

router.get(
	'/',
	asyncWrap(async (req: Request, res: Response) => {
		if (!req.headers.cookie) {
			return res.status(403).send('No Cookie');
		}
		const { refreshToken } = parse(req.headers.cookie);

		if (!refreshToken) {
			console.log('No Refresh Token');
			return res.status(403).send('No RefreshToken');
		}

		try {
			const { id: decodedId, username: decodedUsername } = decode(
				refreshToken
			) as AccessTokenType;
			const refreshResult = await getVerifiedRefreshToken(
				refreshToken,
				decodedId
			);
			if (!refreshResult.ok) {
				return res.status(405).send('expired ');
			} else {
				const newToken = getNewAccessToken(decodedId);
				return res.json({
					success: true,
					accessToken: newToken,
					id: decodedId,
					username: decodedUsername,
				});
			}
		} catch (err) {
			console.log(err.message);
		}
	})
);

export default router;
