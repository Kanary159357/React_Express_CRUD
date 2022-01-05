import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import API from '../../../lib/utils/api';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, headers, body } = req;
	try {
		const { data } = await API.post(`/signup/`, body, {
			headers,
		});
		res.status(200).send(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.log(e.message);
			res.status(401).send(e.message);
		}
	}
};

export default signup;
