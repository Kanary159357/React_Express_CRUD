import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { baseAPIResponse } from '../../../lib/types/Axios';
import { Post } from '../../../lib/types/Post';
import { API } from '../../../lib/utils/serverLessAPI';

export const getServerArticle = (req: Partial<NextApiRequest>) => {
	return API.get<Post>(`/article/${req.query?.id as string}`);
};

const article = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	const id = req.query.id;
	if (method === 'GET') {
		try {
			const { data } = await getServerArticle(req);
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				if (e.response) {
					res.status(e.response.status).send(e.response?.statusText);
				}
			}
		}
	}
	if (method === 'POST') {
		try {
			const { data } = await API.post<baseAPIResponse>(
				`/article/${id as string}`,
				req.body,
				{
					headers: { Authorization: req.headers.authorization || '' },
				}
			);
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				if (e.response) {
					res.status(e.response.status).send(e.response?.statusText);
				}
			}
		}
	}
	if (method === 'DELETE') {
		try {
			const { data } = await API.delete<baseAPIResponse>(
				`/article/${id as string}`,
				{
					headers: { Authorization: req.headers.authorization || '' },
				}
			);
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				if (e.response) {
					res.status(e.response.status).send(e.response?.statusText);
				}
			}
		}
	}
};

export default article;
