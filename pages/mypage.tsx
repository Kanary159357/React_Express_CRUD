import styled from 'styled-components';
import ArticleList from '../component/ArticleList';
import MainLayout from '../Layout/MainLayout';
import Link from 'next/link';
import MyPageLayout from '../Layout/MyPageLayout';
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 24px;
`;

const MyPage = () => {
	return (
		<MyPageLayout>
			<Wrapper>
				<ArticleList />
			</Wrapper>
		</MyPageLayout>
	);
};

export default MyPage;
