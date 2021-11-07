import axios, { AxiosError, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import API from '../../../lib/utils/api';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, headers, body } = req;
	try {
		const { data } = await API.post(`/signup/`, body, {
			headers,
		});
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			const { response } = e;
			const { status, data } = response as AxiosResponse<any>;
			res.status(status).json(data);
		}
	}
};

export default signup;