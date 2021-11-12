import { AxiosResponse } from 'axios';
import { TitleAndDescription } from '../../pages/write';
import { http } from '../utils/serverLessAPI';
import { serialize } from '../utils/slateFn';

export const getPost = async (id: string) => {
	try {
		let { data }: AxiosResponse<any> = await http.get(`/api/article/${id}`);
		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
};

export interface queryObject {
	[key: string]: string;
}

export const getPosts = async ({ pageParam = null }) => {
	let basequery = `/api/main?id=${pageParam}`;
	let { data, status }: AxiosResponse<GetPosts> = await http.get(basequery);
	return data;
};

export const makeGetPostsFn = (query: queryObject) => {
	let str = '';
	console.log(query);
	if (query) {
		str = Object.keys(query).reduce((acc, cur) => {
			return acc + `&${cur}=${query[cur]}`;
		}, '');
	}

	console.log(str);
	return async function ({ pageParam = null }) {
		let { data, status }: AxiosResponse<GetPosts> = await http.get(
			`/api/main?id=${pageParam}` + str
		);
		return data;
	};
};

export const getMyPosts = async () => {
	try {
		const resp = await http.get('/api/mypage');
		return resp.data;
	} catch (e) {
		console.error(e);
	}
};
export const writePost = (post: TitleAndDescription) =>
	http.post('/write', {
		preview: serialize(post.content).substring(0, 200),
		title: post.title,
		content: JSON.stringify(post.content),
	});

export const editPost = async ({
	id,
	post,
}: {
	id: string | string[] | undefined;
	post: TitleAndDescription;
}) => {
	await http.post(`/api/article/${id}`, {
		preview_text: serialize(post.content).substring(0, 200),
		title: post.title,
		content: JSON.stringify(post.content),
	});
};

export const deletePost = async ({ id }: { id: string }) => {
	await http.delete(`/api/article/${id}`);
};
