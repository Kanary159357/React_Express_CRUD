import { GetServerSidePropsContext } from 'next';
import { Store } from 'redux';
import { loginProcess } from '../store/authSlice';
import { RefreshTokenProps } from '../types/Axios';

import { API } from './serverLessAPI';

export const authSSR = async (
	context: GetServerSidePropsContext,
	store: Store
) => {
	try {
		const { data } = await API.get<RefreshTokenProps>('/refresh', {
			headers: { cookie: context.req.headers.cookie },
		});
		const { username, id, accessToken } = data;
		const bearer = `Bearer ${accessToken}`;
		store.dispatch(
			loginProcess({ userData: { id, username }, isLogin: true, accessToken })
		);
		context.req.headers.authorization = bearer;
		return { success: true, accessToken, username, id };
	} catch (e) {
		if (e instanceof Error) {
			return { success: false, error: e };
		}
	}
};
