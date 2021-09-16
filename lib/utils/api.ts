import axios from 'axios';

export const API = axios.create({
	baseURL: 'http://localhost:8000',
	headers: {
		'Content-Type': 'application/json',
	},
});

API.interceptors.request.use((config) => {
	const token = process.browser && localStorage.getItem('token');
	console.log(token);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default API;
