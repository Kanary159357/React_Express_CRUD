import styled from 'styled-components';
import ArticleList from '../component/ArticleList';

import MyPageLayout from '../Layout/MyPageLayout';
import { GetServerSideProps } from 'next';
import { wrapper } from '../lib/store';
import { authSSR } from '../lib/utils/authSSR';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getMyPosts, makeGetPostsFn } from '../lib/services/PostService';
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (context) => {
		const authResult = await authSSR(context, store);
		console.log(authResult);
		if (!authResult.success) {
			return {
				redirect: {
					permanent: false,
					destination: '/',
				},
			};
		}
		return {
			props: {},
		};
	});

const MyPage = () => {
	makeGetPostsFn({ id: 'hihi' });
	return (
		<MyPageLayout>
			<Wrapper>
				<ArticleList />
			</Wrapper>
		</MyPageLayout>
	);
};

export default MyPage;
