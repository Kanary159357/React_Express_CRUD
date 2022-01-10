import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API } from '../../lib/utils/serverLessAPI';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await API.delete('/logout', {
			headers: { Authorization: req.headers.authorization || '' },
		});
		res.status(200).send({ success: true });
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response) {
				res.status(e.response.status).send(e.response?.statusText);
			}
		}
	}
};

export default logout;
