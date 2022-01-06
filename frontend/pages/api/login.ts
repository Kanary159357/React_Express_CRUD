import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API } from '../../lib/utils/serverLessAPI';

interface LoginProps {
	success: boolean;
	token: string;
	id: string;
	username: string;
}

type HeaderProps = { [key: string]: string };

const login = async (req: NextApiRequest, res: NextApiResponse) => {
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
				res.status(404).send(e.message);
				console.log(e.message);
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
				console.log(e);
			}
		}
	}
};

export default login;
