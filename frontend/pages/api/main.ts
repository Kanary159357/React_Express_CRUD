import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { PostPreview } from '../../lib/types/Post';
import { API } from '../../lib/utils/serverLessAPI';

export const getServerIndex = (req: NextApiRequest) => {
	const str = req.query
		? Object.keys(req.query).reduce((acc, cur, i) => {
				let str = `${cur}=${req.query[cur] as string}`;
				if (i !== 0) {
					str = '&' + str;
				}
				return acc + str;
		  }, '?')
		: '';
	return API.get<PostPreview[]>(`/${str}`);
};

const index = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { data } = await getServerIndex(req);
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response) {
				res.status(e.response.status).send(e.response?.data);
			}
		}
	}
};

export default index;
