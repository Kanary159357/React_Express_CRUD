import { Request, Response, Router } from 'express';
import { AccessTokenType } from '../types/TokenType';
import { asyncWrap } from '../utils/asyncWrapper';
import { getNewAccessToken, getVerifiedRefreshToken } from '../utils/jwt-utils';
import { decode } from 'jsonwebtoken';
import * as cookie from 'cookie';
import { parse } from 'cookie';
const router = Router();

router.get(
	'/',
	asyncWrap(async (req: Request, res: Response) => {
		const headers = req.headers;
		if (!headers.cookie) {
			return res.status(401).send({ message: 'No Cookie' });
		}
		const refreshToken = parse(headers.cookie)['refreshToken'];

		if (!refreshToken) {
			console.log('No Refresh Token');
			return res.status(401).send({
				message: 'No Refresh Token',
			});
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
				return res
					.status(405)
					.send({ error: refreshResult, message: 'Refresh Result fail' });
			} else {
				const newToken = getNewAccessToken(decodedId);
				return res.send({
					success: true,
					accessToken: newToken,
					id: decodedId,
					username: decodedUsername,
				});
			}
		} catch (e) {
			res.status(400).send({ error: e });
		}
	})
);

export default router;
