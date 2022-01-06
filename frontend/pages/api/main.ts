import { NextApiRequest, NextApiResponse } from 'next';
import { PostPreview } from '../../lib/types/Post';
import { API } from '../../lib/utils/serverLessAPI';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
	const str = Object.keys(req.query).reduce((acc, cur, i) => {
		let str = `${cur}=${req.query[cur] as string}`;
		if (i !== 0) {
			str = '&' + str;
		}
		return acc + str;
	}, '?');
	try {
		const { data } = await API.get<PostPreview[]>(`/?${str}`);

		res.status(200).json(data);
	} catch (e) {
		res.status(404).send({});
	}
};

export default index;
