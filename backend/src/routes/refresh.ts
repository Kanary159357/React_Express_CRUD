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
		const headers = req.headers;
		if (!headers.cookie) {
			return res.status(401).send('No Cookie');
		}
		const parsedCookie = parse(headers.cookie)['refreshToken'];
		if (!parsedCookie) {
			return res.status(401).send({
				cookie: headers.cookie,
				noparsed: parsedCookie['refreshToken'],
			});
		}
		const refreshToken = parsedCookie;
		if (!refreshToken) {
			console.log('No Refresh Token');
			return res.status(401).send({
				cookie: headers.cookie,
				setter: parsedCookie['refreshToken'],
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
				return res.status(405).send({ refreshToken, decodedId, refreshResult });
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
