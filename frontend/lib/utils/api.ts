import axios, { AxiosError } from 'axios';
import { Router, useRouter } from 'next/dist/client/router';

const API = axios.create({
	baseURL: 'http://aby5gwn2bi.execute-api.us-west-2.amazonaws.com/dev',
	headers: {
		'Content-Type': 'application/json',
	},
});
export default API;
