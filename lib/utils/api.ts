import axios, { AxiosError } from 'axios';
import { Router, useRouter } from 'next/dist/client/router';

const API = axios.create({
	baseURL: 'http://localhost:8001',
	headers: {
		'Content-Type': 'application/json',
	},
});
export default API;
