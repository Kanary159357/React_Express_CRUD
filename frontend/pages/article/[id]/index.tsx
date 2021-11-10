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

import dynamic from 'next/dynamic';
import { Content } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import { AppState, wrapper } from '../../../lib/store';
import { Store } from 'redux';
import { GetServerSidePropsContext } from 'next';
import { authSSR } from '../../../lib/utils/authSSR';
import { getPost } from '../../../lib/services/PostService';
const ControlDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 30px;
	margin-top: -30px;
`;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context: GetServerSidePropsContext) => {
		const authResult = await authSSR(context, store);
		const { params } = context;
		const queryClient = new QueryClient();
		try {
			await queryClient.prefetchQuery('post', () =>
				getPost(params!.id as string)
			);
			const result = queryClient.getQueryData<any>('post');
			if (!result.length) {
				return {
					redirect: {
						permanent: false,
						destination: '/404',
					},
				};
			}
		} catch (e) {}
		console.log('hi');
		return {
			props: {
				dehydratedState: dehydrate(queryClient),
			},
		};
	}
);

const Editor = dynamic(() => import('../../../component/RichEditor'), {
	ssr: false,
});

const Article = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data, isLoading } = useQuery('post', () => getPost(id as string));
	const userData = useSelector((state: AppState) => state.authReducer.userData);
	const user_id = userData ? userData.id : null;
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

	return (
		<>
			{data && (
				<MainLayout>
					<Editor
						readOnly
						post={post}
						created_at={data[0].created_at}
						title={data[0].title}
						user_id={data[0].user_id}
					/>
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
			)}
		</>
	);
};

export default Article;
