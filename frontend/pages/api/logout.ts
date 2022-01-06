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
		res.status(404).send({ success: false });
	}
};

export default logout;
