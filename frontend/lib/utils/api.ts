import axios from 'axios';

const API = axios.create({
	baseURL: 'https://aby5gwn2bi.execute-api.us-west-2.amazonaws.com/dev',
});
export default API;
