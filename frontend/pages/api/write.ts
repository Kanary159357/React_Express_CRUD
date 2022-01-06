import { NextApiHandler } from 'next';
import { API } from '../../lib/utils/serverLessAPI';
const write: NextApiHandler = async (req, res) => {
	const { body } = req;
	try {
		const { data } = await API.post('/write', body, {
			headers: { Authorization: req.headers.authorization || '' },
		});
		res.status(200).send(data);
	} catch (e) {
		res.status(404).send('실패~');
	}
};

export default write;
