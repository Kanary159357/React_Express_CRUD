import { Button } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { Descendant } from 'slate';
import styled from 'styled-components';
import MainLayout from '../../../Layout/MainLayout';
import Link from 'next/link';
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import API from '../../../lib/utils/api';
import { useEffect } from 'react';

import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetStaticPropsResult,
} from 'next';
import dynamic from 'next/dynamic';
import { Content } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
const ControlDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 30px;
	margin-top: -30px;
`;
export async function getServerSideProps({
	params,
}: {
	params: { id: string };
}) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery('post', () => getPost(params.id));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
const Editor = dynamic(() => import('../../../component/RichEditor'), {
	ssr: false,
});
const getPost = async (id: string) => {
	try {
		let { data }: AxiosResponse<any> = await API.get(`/article/${id}`);
		return data;
	} catch (err) {
		console.error(err);
	}
};
const deletePost = async (id: string) => {
	try {
		await API.delete(`/article/${id}`);
	} catch (err) {
		console.error(err);
	}
};

const Article = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data, isLoading } = useQuery('post', () => getPost(id as string));
	const user_id = useSelector((state: RootState) => state.auth.userData.id);
	const post: { title: string; content: Descendant[] } = {
		title: data[0].title,
		content: data[0].content,
	};
	const deleteMutation = useMutation(
		(id: string) => API.delete(`/article/${id}`),
		{
			onSuccess: () => {
				router.push('/');
			},
		}
	);

	useEffect(() => {
		console.log(user_id, data[0].user_id);
	}, [data, user_id]);
	return (
		<MainLayout>
			<Editor readOnly post={post} title={data[0].title} />
			{user_id == data[0].user_id && (
				<ControlDiv>
					<Button>
						<Link href={`/article/${id}/edit`}>
							<a>수정</a>
						</Link>
					</Button>
					<Button onClick={() => deleteMutation.mutate(id as string)}>
						삭제
					</Button>
				</ControlDiv>
			)}
		</MainLayout>
	);
};

export default Article;
