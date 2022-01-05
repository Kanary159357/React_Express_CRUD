import { GetServerSidePropsContext } from 'next';
import { Store } from 'redux';
import { loginProcess } from '../store/authSlice';
import { http } from './serverLessAPI';

export const authSSR = async (
	context: GetServerSidePropsContext,
	store: Store
) => {
	const headers = context.req.headers;
	try {
		const refreshResp = await http.get('/api/refresh', { headers });
		const { username, id, accessToken } = refreshResp.data;
		const bearer = `Bearer ${accessToken}`;
		http.defaults.headers.Authorization = bearer;
		store.dispatch(
			loginProcess({ userData: { id, username }, isLogin: true, accessToken })
		);
		return { success: true, accessToken, username, id };
	} catch (e) {
		return { success: false, error: e };
	}
};
