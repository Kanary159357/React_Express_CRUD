import axios from 'axios';

import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Store } from 'redux';
import { updateAccessToken } from '../store/authSlice';

let store: Store;

export const injectStoreToInterceptor = (_store: Store) => {
	store = _store;
};

export const http = axios.create({
	baseURL: '/',
	withCredentials: true,
});

createAuthRefreshInterceptor(http, (failedRequest) =>
	http
		.get('/api/refresh')
		.then((resp) => {
			if (http.defaults.headers.setCookie) {
				delete http.defaults.headers.setCookie;
			}
			if (resp.status !== 200) {
				alert('다시 로그인해주세요');
				return;
			}
			const { accessToken } = resp.data;
			const bearer = `Bearer ${accessToken}`;
			http.defaults.headers.Authorization = bearer;
			store.dispatch(updateAccessToken({ token: accessToken }));
			failedRequest.response.config.headers.Authorization = bearer;

			return Promise.resolve();
		})
		.catch((e) => {
			alert(e);
			alert('다시 로그인해주세요');
		})
);
