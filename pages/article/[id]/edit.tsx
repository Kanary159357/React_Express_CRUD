import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import MainLayout from '../../../Layout/MainLayout';
import { TitleAndDescription } from '../../write';
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query';
import { Button } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { getPost, editPost } from '../../../lib/services/PostService';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../../../lib/store';
import { authSSR } from '../../../lib/utils/authSSR';
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
		await queryClient.prefetchQuery('postEdit', () =>
			getPost(context.params!.id as string)
		);
		const postData = queryClient.getQueryData<any>('postEdit');
		if (postData.user_id != authResult.id) {
			return {
				redirect: {
					permanent: false,
					destination: '/404',
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

	const { data, isLoading } = useQuery('postEdit', () => getPost(id as string));

	const [post, setPost] = useState<TitleAndDescription>({
		title: data[0].title,
		content: data[0].content,
	});
	const editMutation = useMutation(editPost, {
		onSuccess: () => {
			router.push(`/article/${id}`);
		},
	});
	return (
		<MainLayout>
			<Wrapper>
				{data && <Editor post={post} setPost={setPost} />}
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
