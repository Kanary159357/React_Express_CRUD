import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { RefreshTokenProps } from '../../lib/types/Axios';
import { API } from '../../lib/utils/serverLessAPI';

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
			if (e.response) {
				res.status(e.response.status).send(e.response.data);
			}
		}
	}
};

export default refresh;
