import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import API from '../../lib/utils/api';

const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
	const { headers } = req;
	try {
		const { data } = await API.get('/refresh', {
			headers: {
				cookie: headers.cookie,
			},
		});
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			res.status(404).send(headers.cookie);
		}
	}
};

export default refresh;
