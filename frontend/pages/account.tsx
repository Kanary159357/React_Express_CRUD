import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import MyPageLayout from '../Layout/MyPageLayout';
import { wrapper } from '../lib/store';
import { Palette } from '../lib/styles/Theme';
import { authSSR } from '../lib/utils/authSSR';
import { http } from '../lib/utils/serverLessAPI';

import { serverGetAccount } from './api/account';

const Wrapper = styled.div`
	background: ${Palette.white};
	height: 600px;
	display: flex;
	flex-direction: column;
	padding: 50px;
`;

const Row = styled.div`
	display: flex;
	margin-bottom: 50px;
	font-size: 18px;
`;

const RowTitle = styled.div`
	margin-right: 40px;
	flex: 1;
`;

const RowContent = styled.div`
	display: flex;
	width: 100%;
	flex: 3;
	flex-direction: column;
	* + * {
		margin-top: 10px;
	}
`;

export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (context) => {
		const authResult = await authSSR(context, store);
		if (!authResult.success) {
			return {
				redirect: {
					permanent: false,
					destination: '/404',
				},
			};
		}
		const queryClient = new QueryClient();
		console.log(context.req.headers);
		queryClient.prefetchQuery('account', () => serverGetAccount(context.req));
		return {
			props: {
				dehydratedState: dehydrate(queryClient),
			},
		};
	});

export interface AccountProps {
	id: string;
	username: string;
	registration_date: Date;
}
const getAccountInfo = async () => {
	try {
		const resp = await http.get<AccountProps>('/api/account');
		return resp.data;
	} catch (e) {
		console.error(e);
	}
};

const Account = () => {
	const { data } = useQuery('account', getAccountInfo);
	return (
		<MyPageLayout>
			<Wrapper>
				{data && (
					<>
						<Row>
							<RowTitle>아이디</RowTitle>
							<RowContent>{data.id}</RowContent>
						</Row>
						<Row>
							<RowTitle>닉네임</RowTitle>
							<RowContent>{data.username}</RowContent>
						</Row>
						<Row>
							<RowTitle>가입일자</RowTitle>
							<RowContent>{data.registration_date}</RowContent>
						</Row>
					</>
				)}
			</Wrapper>
		</MyPageLayout>
	);
};

export default Account;
