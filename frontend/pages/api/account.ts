import axios from 'axios';
import { NextApiResponse } from 'next';
import { NextApiRequestWithAuthHeader } from '../../lib/types/Axios';
import { API } from '../../lib/utils/serverLessAPI';
import { AccountProps } from '../account';

export const serverGetAccount = (req: NextApiRequestWithAuthHeader) => {
	return API.get<AccountProps>('/account', {
		headers: { Authorization: req.headers.authorization },
	});
};

export default async function handler(
	req: NextApiRequestWithAuthHeader,
	res: NextApiResponse
) {
	try {
		const { data } = await serverGetAccount(req);
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response) {
				res.status(e.response.status).send(e.response?.data);
			}
		}
	}
}
