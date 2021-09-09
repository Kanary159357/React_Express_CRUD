import styled from 'styled-components';
import ArticleList from '../component/ArticleList';
import UserProfileBox from '../component/UserProfileBox';
import MainLayout from '../Layout/MainLayout';
import { Palette } from '../lib/styles/Theme';

const Content = styled.div`
	display: flex;
`;

const Title = styled.div`
	height: 50px;
	font-size: 24px;
	margin-top: 30px;
`;

const Index = () => {
	return (
		<MainLayout>
			<Title>메인페이지</Title>
			<Content>
				<ArticleList />
				<UserProfileBox />
			</Content>
		</MainLayout>
	);
};

export default Index;
