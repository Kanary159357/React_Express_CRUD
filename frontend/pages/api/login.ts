import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import API from '../../lib/utils/api';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, headers, body } = req;
	if (method === 'POST') {
		try {
			const { data, headers: returnedHeaders } = await API.post(
				'/login',
				body,
				{
					headers,
				}
			);
			Object.keys(returnedHeaders).forEach((key) =>
				res.setHeader(key, returnedHeaders[key])
			);
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				res.status(404).send(e.message);
				console.log(e.message);
			}
		}
	}
	if (method === 'GET') {
		try {
			const { data } = await API.get('/login', {
				headers,
			});

			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log(e);
			}
		}
	}
};

export default login;
