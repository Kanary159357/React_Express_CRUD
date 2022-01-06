import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API } from '../../lib/utils/serverLessAPI';
import { AccountProps } from '../account';

export const serverGetAccount = (req: any) => {
	return API.get<AccountProps>('/account', {
		headers: { Authorization: req.headers.authorization || '' },
	});
};

const account = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { data } = await serverGetAccount(req);
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			res.status(e.response!.status).send(e.response?.data);
		}
	}
};

export default account;
