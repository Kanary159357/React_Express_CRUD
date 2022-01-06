import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API } from '../../../lib/utils/serverLessAPI';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { data } = await API.get<string>(`/signup/${req.query.id as string}`);
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const { response } = e;
			res.status(response!.status).send(response?.statusText);
		}
	}
};

export default signup;
