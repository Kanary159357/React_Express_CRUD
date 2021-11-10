import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import API from '../utils/api';
import { http } from '../utils/serverLessAPI';
import { store } from '../store';
import { logoutProcess } from '../store/authSlice';
import Router from 'next/router';

export interface UserAuthProps {
	success: boolean;
	token: string | null;
	id: string;
	username: string;
}
export interface InputProps {
	id: string;
	password: string;
	username: string;
}
export const login = async (values: { id: string; password: string }) => {
	let { data, headers }: AxiosResponse<UserAuthProps> = await http.post(
		`/api/login`,
		values
	);
	return data;
};
export const logout = async () => await http.delete('/api/logout');
export const signup = async (content: InputProps) =>
	await http.post('/api/signup', content);

export const signupCheckId = async (id: string) => {
	let { data }: AxiosResponse<any> = await http.get(`/api/signup/${id}`);
	return data;
};
export function useLogoutMutation() {
	return useMutation(logout, {
		onSuccess: () => {
			store.dispatch(logoutProcess());
			Router.push('/');
		},
		onError: () => {
			alert('에러가 발생했습니다');
		},
	});
}
