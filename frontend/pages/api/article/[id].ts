/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../lib/types/Post';
import { API } from '../../../lib/utils/serverLessAPI';

const article = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, headers, body } = req;
	const id = req.query.id;
	if (method === 'GET') {
		try {
			const { data } = await API.get<Post>(`/article/${id as string}`, {
				headers,
			});
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				res.status(e.response!.status).send(e.response?.statusText);
			}
		}
	}
	if (method === 'POST') {
		try {
			const { data } = await API.post(`/article/${id as string}`, body, {
				headers,
			});
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const { response } = e;
				res.status(response!.status).json(response?.data);
			}
		}
	}
	if (method === 'DELETE') {
		try {
			const { data } = await API.delete(`/article/${id as string}`, {
				headers,
			});
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const { response } = e;
				res.status(response!.status).json(response?.data);
			}
		}
	}
};

export default article;
