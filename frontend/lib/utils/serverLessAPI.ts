import axios, { AxiosInstance } from 'axios';

import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Store } from 'redux';
import { updateAccessToken } from '../store/authSlice';
import { RefreshTokenProps } from '../types/Axios';

let store: Store;

export const injectStoreToInterceptor = (_store: Store) => {
	store = _store;
};

interface CustomAxiosInstance extends AxiosInstance {
	defaults: {
		headers?: {
			[key: string]: string | undefined;
		};
	};
}

export const http: CustomAxiosInstance = axios.create({
	baseURL: '/',
	withCredentials: true,
});

createAuthRefreshInterceptor(http, (failedRequest) =>
	http
		.get<RefreshTokenProps>('/api/refresh')
		.then((resp) => {
			if (http.defaults.headers && http.defaults.headers.setCookie) {
				delete http.defaults.headers.setCookie;
			}
			console.log('hi');
			if (resp.status !== 200) {
				alert('다시 로그인해주세요');
				return;
			}
			const { accessToken } = resp.data;
			const bearer = `Bearer ${accessToken}`;
			console.log(bearer);
			if (http.defaults.headers) http.defaults.headers.Authorization = bearer;
			store.dispatch(updateAccessToken({ token: accessToken }));
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			failedRequest.response.config.headers['Authorization'] = bearer;
			return Promise.resolve();
		})
		.catch((e) => {
			if (e instanceof Error) {
				console.error(e);
			}
		})
);

export const API = axios.create({
	baseURL: 'https://aby5gwn2bi.execute-api.us-west-2.amazonaws.com/dev',
	withCredentials: true,
});
