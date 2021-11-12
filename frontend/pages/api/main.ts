import axios, { AxiosError, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import API from '../../lib/utils/api';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, headers, body } = req;
	console.log(req.query);
	const str = Object.keys(req.query).reduce((acc, cur, i) => {
		let str = `${cur}=${req.query[cur]}`;
		if (i !== 0) {
			str = '&' + str;
		}
		return acc + str;
	}, '?');
	console.log(str);
	try {
		const { data } = await API.get(`/${str}`, {
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

export default index;
