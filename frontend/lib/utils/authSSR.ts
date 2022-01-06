import { GetServerSidePropsContext } from 'next';
import { Store } from 'redux';
import { loginProcess } from '../store/authSlice';

import { API } from './serverLessAPI';

export const authSSR = async (
	context: GetServerSidePropsContext,
	store: Store
) => {
	try {
		const { data } = await API.get('/refresh', {
			headers: { cookie: context.req.headers.cookie },
		});
		const { username, id, accessToken } = data;
		const bearer = `Bearer ${accessToken as string}`;
		store.dispatch(
			loginProcess({ userData: { id, username }, isLogin: true, accessToken })
		);
		API.defaults.headers.Authorization = bearer;
		return { success: true, accessToken, username, id };
	} catch (e) {
		return { success: false, error: e };
	}
};
