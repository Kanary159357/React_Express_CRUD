import styled from 'styled-components';
import ArticleList from '../component/ArticleList';
import MainLayout from '../Layout/MainLayout';
import Link from 'next/link';
import MyPageLayout from '../Layout/MyPageLayout';
import { GetServerSideProps } from 'next';
import { wrapper } from '../lib/store';
import { authSSR } from '../lib/utils/authSSR';
import { http } from '../lib/utils/serverLessAPI';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getMyPosts } from '../lib/services/PostService';
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 24px;
`;
export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (context) => {
		const authResult = await authSSR(context, store);
		if (!authResult.success) {
			return {
				redirect: {
					permanent: false,
					destination: '/',
				},
			};
		}
		const queryClient = new QueryClient();
		queryClient.prefetchQuery('mypost', getMyPosts);
		return {
			props: {
				dehydratedState: dehydrate(queryClient),
			},
		};
	});

const MyPage = () => {
	const { data, isLoading } = useQuery('mypost', getMyPosts);

	return (
		<MyPageLayout>
			<Wrapper>{data && <ArticleList posts={data} />}</Wrapper>
		</MyPageLayout>
	);
};

export default MyPage;
