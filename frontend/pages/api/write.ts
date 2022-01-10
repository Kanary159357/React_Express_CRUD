import axios from 'axios';
import { NextApiHandler } from 'next';
import { baseAPIResponse } from '../../lib/types/Axios';
import { API } from '../../lib/utils/serverLessAPI';

const write: NextApiHandler = async (req, res) => {
	try {
		const { data } = await API.post<baseAPIResponse>('/write', req.body, {
			headers: { Authorization: req.headers.authorization || '' },
		});
		res.status(200).send(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response) {
				res.status(e.response.status).send(e.response.data);
			}
		}
	}
};

export default write;
