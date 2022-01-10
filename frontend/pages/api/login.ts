import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { LoginProps } from '../../lib/types/Axios';
import { API } from '../../lib/utils/serverLessAPI';

type HeaderProps = { [key: string]: string };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method, headers } = req;
	if (method === 'POST') {
		try {
			const resp = await API.post<LoginProps>('/login', req.body);
			const { data } = resp;
			const headers = resp.headers as HeaderProps;
			Object.keys(headers).forEach((key) => res.setHeader(key, headers[key]));
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				if (e.response) {
					res.status(e.response.status).send(e.response?.data);
				}
			}
		}
	}
	if (method === 'GET') {
		try {
			const { data } = await API.get<Omit<LoginProps, 'token'>>('/login', {
				headers,
			});
			res.status(200).json(data);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				if (e.response) {
					res.status(e.response.status).send(e.response?.data);
				}
			}
		}
	}
}
