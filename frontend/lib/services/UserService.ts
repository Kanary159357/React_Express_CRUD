import { AxiosResponse } from 'axios';
import { AccountProps } from '../../pages/account';
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
	const { data }: AxiosResponse<UserAuthProps> = await http.post(
		`/api/login`,
		values
	);
	return data;
};
export const logout = () => http.delete('/api/logout');
export const signup = async (content: InputProps) =>
	await http.post('/api/signup', content);
export const getAccountInfo = async () => {
	try {
		const resp = await http.get<AccountProps>('/api/account');
		return resp.data;
	} catch (e) {
		console.error(e);
	}
};
export const signupCheckId = async (id: string) => {
	const { data } = await http.get<boolean>(`/api/signup/${id}`);
	return data;
};
