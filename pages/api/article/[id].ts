import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import API from '../../../lib/utils/api';

const article = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, headers, body } = req;
	const id = req.query.id;
	if (method === 'GET') {
		try {
			const { data, headers: returnedHeaders } = await API.get(
				`/article/${id}`,
				{
					headers,
				}
			);
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const { response } = e;
				const { status, data } = response as AxiosResponse<any>;
				res.status(status).json(data);
			}
		}
	}
	if (method === 'POST') {
		try {
			const { data } = await API.post(`/article/${id}`, body, {
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
	}
	if (method === 'DELETE') {
		try {
			const { data } = await API.delete(`/article/${id}`, {
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
	}
};

export default article;
