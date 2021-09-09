import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
interface UserAuthProps {
	success: boolean;
	token?: string;
}

const useUser = () => {
	const [isLogin, setIsLogin] = useState<boolean>(
		(process.browser && JSON.parse(localStorage.getItem('isLogin'))) || false
	);
	const [token, setToken] = useState<string>(
		(process.browser && localStorage.getItem('token')) || null
	);
	const login = async (values: { email: string; password: string }) => {
		try {
			let { data }: AxiosResponse<UserAuthProps> = await axios.post(
				`${process.env.BACKEND}/login`,
				values
			);
			if (data.success) {
				setToken(data.token);
				setIsLogin(true);
				process.browser && localStorage.setItem('isLogin', 'true');
				process.browser && localStorage.setItem('token', data.token);
			}
			return data.success;
		} catch (err) {
			console.error(err);
		}
		return false;
	};
	const logout = async () => {
		localStorage.removeItem('isLogin');
		localStorage.removeItem('token');
		setIsLogin(false);
		setToken(null);
	};
	return { isLogin, login, logout };
};

export default useUser;
