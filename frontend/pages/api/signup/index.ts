import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { SignupCheckProps } from '../../../lib/types/Axios';
import { API } from '../../../lib/utils/serverLessAPI';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { data } = await API.post<SignupCheckProps>(`/signup/`, req.body);
		res.status(200).send(data);
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.log(e.message);
			res.status(401).send(e.message);
		}
	}
};

export default signup;
