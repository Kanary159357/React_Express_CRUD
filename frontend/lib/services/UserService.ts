import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { http } from '../utils/serverLessAPI';
import { store } from '../store';
import { logoutProcess } from '../store/authSlice';
import { useRouter } from 'next/router';

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
	const { data }: AxiosResponse<UserAuthProps> = await http.post(
		`/api/login`,
		values
	);
	return data;
};
export const logout = () => http.delete('/api/logout');
export const signup = async (content: InputProps) =>
	await http.post('/api/signup', content);

export const signupCheckId = async (id: string) => {
	const { data } = await http.get<boolean>(`/api/signup/${id}`);
	return data;
};
export function useLogoutMutation() {
	const router = useRouter();
	return useMutation(logout, {
		onSuccess: () => {
			store.dispatch(logoutProcess());
			router.push('/');
		},
		onError: () => {
			alert('에러가 발생했습니다');
		},
	});
}
