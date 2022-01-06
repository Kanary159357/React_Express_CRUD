import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API } from '../../lib/utils/serverLessAPI';

const mypage = async (req: NextApiRequest, res: NextApiResponse) => {
	const { headers } = req;

	try {
		const { data } = await API.get<PostPreview[]>('/mypage', {
			headers,
		});
		res.status(200).json(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			res.status(404).json(e);
		}
	}
};

export default mypage;
