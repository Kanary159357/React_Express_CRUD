/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AxiosResponse } from 'axios';
import { TitleAndDescription } from '../../pages/write';
import { http } from '../utils/serverLessAPI';
import { serialize } from '../utils/slateFn';

export const getPost = async (id: string) => {
	try {
		const { data }: AxiosResponse<Post> = await http.get(`/api/article/${id}`);
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
	const basequery = `/api/main?id=${pageParam}`;
	const { data }: AxiosResponse<GetPosts> = await http.get(basequery);
	return data;
};

export const makeGetPostsFn = (query: queryObject) => {
	let str = '';
	if (query) {
		str = Object.keys(query).reduce((acc, cur) => {
			return acc + `&${cur}=${query[cur]}`;
		}, '');
	}
	return async function ({ pageParam = null }) {
		const { data }: AxiosResponse<GetPosts> = await http.get(
			`/api/main?id=${pageParam}` + str
		);
		return data;
	};
};

export const writePost = (post: TitleAndDescription) => {
	return http.post('/api/write', {
		preview: serialize(post.content).substring(0, 200),
		title: post.title,
		content: JSON.stringify(post.content),
	});
};

export const editPost = async ({
	id,
	post,
}: {
	id: string | string[] | undefined;
	post: TitleAndDescription;
}) => {
	await http.post(`/api/article/${id as string}`, {
		preview_text: serialize(post.content).substring(0, 200),
		title: post.title,
		content: JSON.stringify(post.content),
	});
};

export const deletePost = async ({ id }: { id: string }) => {
	await http.delete(`/api/article/${id}`);
};
