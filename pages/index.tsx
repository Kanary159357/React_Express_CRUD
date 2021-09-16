import { Button } from 'antd';
import styled from 'styled-components';
import ArticleList from '../component/ArticleList';
import MainLayout from '../Layout/MainLayout';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import { API } from '../lib/utils/api';
import { useEffect } from 'react';
import { QueryClient, useQuery } from 'react-query';
import dynamic from 'next/dynamic';
import { dehydrate } from 'react-query/hydration';

const UserProfileBox = dynamic(() => import('../component/UserProfileBox'));
const Content = styled.div`
	display: flex;
`;

const Title = styled.div`
	height: 50px;
	font-size: 24px;
	margin-top: 30px;
`;

const SideDiv = styled.div``;
const getPosts = async () => {
	try {
		let { data }: AxiosResponse<any> = await API.get(`/`);
		return data;
	} catch (err) {
		console.error(err);
	}
};
export async function getServerSideProps() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery('postsList', getPosts);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
const Index = () => {
	const { data, isLoading } = useQuery('postsList', getPosts);

	return (
		<MainLayout>
			<Title>메인페이지</Title>
			<Content>
				{data && <ArticleList posts={data} />}
				<SideDiv>
					<UserProfileBox />
					<Button>
						<Link href='/write'>
							<a>글 작성</a>
						</Link>
					</Button>
				</SideDiv>
			</Content>
		</MainLayout>
	);
};

export default Index;
