import styled from 'styled-components';
import ArticleList from '../component/ArticleList';

import MyPageLayout from '../Layout/MyPageLayout';
import { GetServerSideProps } from 'next';
import { AppState, wrapper } from '../lib/store';
import { authSSR } from '../lib/utils/authSSR';
import { useSelector } from 'react-redux';
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
	const user_id = useSelector(
		(state: AppState) => state.authReducer.userData?.id
	);
	return (
		<MyPageLayout>
			<Wrapper>
				<ArticleList query={{ user_id: user_id! }} />
			</Wrapper>
		</MyPageLayout>
	);
};

export default MyPage;
