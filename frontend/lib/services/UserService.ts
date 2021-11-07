import { AxiosResponse } from 'axios';
import API from '../utils/api';
import { http } from '../utils/serverLessAPI';

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
