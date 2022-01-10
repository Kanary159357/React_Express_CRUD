import axios from 'axios';

export default function baseAPIErrorCheck(fn: () => void) {
	try {
		fn();
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response) {
				res.status(e.response.status).send(e.response.data);
			}
		}
	}
}
