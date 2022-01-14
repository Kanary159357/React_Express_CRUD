import axios from 'axios';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import styled from 'styled-components';
import MyPageLayout from '../Layout/MyPageLayout';
import useAccountQuery from '../lib/query/users/useAccountQuery';
import { wrapper } from '../lib/store';
import { Palette } from '../lib/styles/Theme';
import { NextApiRequestWithAuthHeader } from '../lib/types/Axios';
import { authSSR } from '../lib/utils/authSSR';
import extractDate from '../lib/utils/extractDate';
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
		if (!authResult || !authResult.success) {
			return {
				redirect: {
					permanent: false,
					destination: '/404',
				},
			};
		}
		const queryClient = new QueryClient();
		try {
			await queryClient.prefetchQuery('account', async () => {
				const { data } = await serverGetAccount(
					context.req as NextApiRequestWithAuthHeader
				);
				return data;
			});
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log(e.message);
			}
		}
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

const Account = () => {
	const { data } = useAccountQuery();
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
							<RowContent>
								{extractDate(new Date(data.registration_date)).fullDate}
							</RowContent>
						</Row>
					</>
				)}
			</Wrapper>
		</MyPageLayout>
	);
};

export default Account;
