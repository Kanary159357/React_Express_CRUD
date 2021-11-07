import styled from 'styled-components';
import ArticleList from '../component/ArticleList';
import MainLayout from '../Layout/MainLayout';

import { wrapper } from '../lib/store';

import { GetServerSideProps } from 'next';
import { authSSR } from '../lib/utils/authSSR';
import { useDispatch } from 'react-redux';

const Content = styled.div`
	display: flex;
	justify-content: center;
`;

const Title = styled.div`
	height: 50px;
	font-size: 24px;
	margin-top: 30px;
`;

export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (context) => {
		const authResult = await authSSR(context, store);
		return {
			props: {},
		};
	});
const Index = () => {
	const dispatch = useDispatch();

	return (
		<MainLayout>
			<Title>메인페이지</Title>
			<Content>
				<ArticleList />
			</Content>
		</MainLayout>
	);
};

export default Index;
