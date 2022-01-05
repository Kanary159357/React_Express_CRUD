import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import MyPageLayout from '../Layout/MyPageLayout';
import { wrapper } from '../lib/store';
import { Palette } from '../lib/styles/Theme';
import { authSSR } from '../lib/utils/authSSR';
import { http } from '../lib/utils/serverLessAPI';
import { useRef } from 'react';
import { passwordValidation } from '../lib/utils/validation';
import StyledInput from '../component/base/StyledInput';
import { Button } from '../component/base/EditorBase';
import RoundLabel from '../component/base/RoundLabel';

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
		queryClient.prefetchQuery('account', getAccountInfo);
		return {
			props: {
				dehydratedState: dehydrate(queryClient),
			},
		};
	});
const getAccountInfo = async () => {
	try {
		const resp = await http.get('/api/account');
		return resp.data;
	} catch (e) {
		console.error(e);
	}
};

const changeAccountPassword = async () => {
	try {
		const resp = await http.post('/api/account');
		return resp.data;
	} catch (e) {
		console.error(e);
	}
};

const Account = () => {
	const inputRef = useRef(null);
	const inputValidRef = useRef(null);
	const onChange = () => {
		if (passwordValidation(inputRef.current!, inputValidRef.current!)) {
			changeAccountPassword();
		} else {
			alert('비밀번호를 다시 확인해주세요');
		}
	};
	const { data } = useQuery('account', getAccountInfo);
	return (
		<MyPageLayout>
			<Wrapper>
				{data && (
					<>
						<Row>
							<RowTitle>아이디</RowTitle>
							<RowContent>{data[0].id}</RowContent>
						</Row>
						<Row>
							<RowTitle>닉네임</RowTitle>
							<RowContent>{data[0].username}</RowContent>
						</Row>
						<Row>
							<RowTitle>가입일자</RowTitle>
							<RowContent>{data[0].registration_date}</RowContent>
						</Row>
						<Row>
							<RowTitle>비밀번호 수정</RowTitle>
							<RowContent>
								<StyledInput
									ref={inputRef}
									placeholder='비밀번호를 입력하세요'
								/>

								<StyledInput
									ref={inputValidRef}
									placeholder='비밀번호를 입력하세요'
								/>
								<Button onClick={onChange}>
									<RoundLabel background={Palette.orange_1} width='100%'>
										수정
									</RoundLabel>
								</Button>
							</RowContent>
						</Row>
					</>
				)}
			</Wrapper>
		</MyPageLayout>
	);
};

export default Account;
