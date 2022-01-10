import { AxiosRequestConfig } from 'axios';
import { NextApiRequest } from 'next';

export interface baseAPIResponse {
	message: string;
	error?: Error;
}

export interface NextApiRequestWithAuthHeader extends NextApiRequest {
	headers: { [key: string]: string };
}
export interface RefreshTokenProps {
	success: boolean;
	accessToken: string;
	id: string;
	username: string;
}
export interface LoginProps {
	success: boolean;
	token: string;
	id: string;
	username: string;
}
export interface SignupCheckProps {
	available: boolean;
}
