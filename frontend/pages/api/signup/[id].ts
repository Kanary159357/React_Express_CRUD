import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API } from '../../../lib/utils/serverLessAPI';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { data } = await API.get<string>(`/signup/${req.query.id as string}`);
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response) {
				res.status(e.response.status).send(e.response.statusText);
			}
		}
	}
};

export default signup;
