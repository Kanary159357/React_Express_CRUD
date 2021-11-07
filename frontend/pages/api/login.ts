import axios, { AxiosResponse } from 'axios';
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
			console.log(returnedHeaders);
			Object.keys(returnedHeaders).forEach((key) =>
				res.setHeader(key, returnedHeaders[key])
			);
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const { response } = e;
				console.log(response);
				const { status, data } = response as AxiosResponse<any>;
				res.status(status).json(data);
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
				const { response } = e;
				console.log(response);
				const { status, data } = response as AxiosResponse<any>;
				res.status(status).json(data);
			}
		}
	}
};

export default login;
