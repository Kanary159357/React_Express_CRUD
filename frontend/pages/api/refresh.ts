import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API } from '../../lib/utils/serverLessAPI';

interface RefreshTokenProps {
	success: boolean;
	accessToken: string;
	id: string;
	username: string;
}

const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
	const { headers } = req;
	try {
		const { data } = await API.get<RefreshTokenProps>('/refresh', {
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
