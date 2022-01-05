import axios, { AxiosError, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import API from '../../lib/utils/api';

const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, headers, body } = req;

	try {
		const { data } = await API.get('/refresh', {
			headers,
		});
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			res.status(404).send(e.message);
		}
	}
};

export default refresh;
