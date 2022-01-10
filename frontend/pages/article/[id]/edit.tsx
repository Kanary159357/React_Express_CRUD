import styled from 'styled-components';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import MainLayout from '../../../Layout/MainLayout';
import { TitleAndDescription } from '../../write';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { Button } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { getPost } from '../../../lib/services/PostService';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../../lib/store';
import { authSSR } from '../../../lib/utils/authSSR';
import { Post } from '../../../lib/types/Post';
import { getServerArticle } from '../../api/article/[id]';
import usePostEditMutation from '../../../lib/query/post/usePostEditMutation';
const Wrapper = styled.div`
	min-height: 800px;
`;

const Editor = dynamic(() => import('../../../component/RichEditor'), {
	ssr: false,
});
const ControlDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 30px;
	margin-top: -30px;
`;

export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (context) => {
		const authResult = await authSSR(context, store);
		const queryClient = new QueryClient();
		const customReq = {
			query: { id: context.params?.id || '' },
		};
		await queryClient.prefetchQuery('postEdit', async () => {
			const { data } = await getServerArticle(customReq);
			return data;
		});
		const postData = queryClient.getQueryData<Post>('postEdit');
		if (!authResult || postData?.user_id != authResult.id) {
			return {
				redirect: {
					permanent: false,
					destination: '/',
				},
			};
		}
		return {
			props: {
				dehydratedState: dehydrate(queryClient),
			},
		};
	});

const Edit = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data } = useQuery<Post>('postEdit', () => getPost(id as string));

	const [post, setPost] = useState<TitleAndDescription>({
		title: data?.title || '',
		content: data?.content || [],
	});
	const editMutation = usePostEditMutation();
	return (
		<MainLayout>
			<Wrapper>
				{data && <Editor post={post} setPost={setPost} readOnly={false} />}
				<ControlDiv>
					<Button onClick={() => editMutation.mutate({ id, post })}>
						작성
					</Button>
				</ControlDiv>
			</Wrapper>
		</MainLayout>
	);
};

export default Edit;
