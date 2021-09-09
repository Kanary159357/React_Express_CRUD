import { Button, Input } from 'antd';
import styled from 'styled-components';
import MyPageLayout from '../Layout/MyPageLayout';
import { Palette } from '../lib/styles/Theme';

const Wrapper = styled.div`
	margin-top: 50px;
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
`;

const RowContent = styled.div`
	display: flex;
`;

const Account = () => {
	return (
		<MyPageLayout>
			<Wrapper>
				<Row>
					<RowTitle>아이디</RowTitle>
					<RowContent>acehong1021</RowContent>
				</Row>
				<Row>
					<RowTitle>이메일</RowTitle>
					<RowContent>acehong1021@naver.com</RowContent>
				</Row>
				<Row>
					<RowTitle>가입일자</RowTitle>
					<RowContent>2021-01-01</RowContent>
				</Row>
				<Row>
					<RowTitle>비밀번호 수정</RowTitle>
					<RowContent>
						<Input placeholder='비밀번호를 입력하세요' />
						<Button>수정</Button>
					</RowContent>
				</Row>
			</Wrapper>
		</MyPageLayout>
	);
};

export default Account;
