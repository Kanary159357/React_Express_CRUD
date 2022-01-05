import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import API from '../../../lib/utils/api';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
	const { headers } = req;
	try {
		const { data } = await API.get(`/signup/${req.query.id}`);
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.log(e.request);
		}
	}
};

export default signup;
