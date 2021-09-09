import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';
import useUser from '../lib/hooks/useUsers';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
const Wrapper = styled.div`
	height: calc(100vh - 70px);
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoginBox = styled.div`
	border: 1px solid ${Palette.gray_1};
	border-radius: 16px;
	background: ${Palette.white};
	width: 500px;
	height: 300px;
	padding: 30px;
`;

const Header = styled.div`
	font-size: 24px;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 240px;
	align-items: center;
`;

const StyledInputForm = styled(Input)`
	display: flex;
	height: 50px;
	flex-direction: row;
`;

const StyledButton = styled(Button)`
	width: 100%;
`;

const StyledControl = styled.div``;

const Login = () => {
	const router = useRouter();
	const { login, isLogin } = useUser();

	const onFinish = async (values: any) => {
		const result = login(values);
		if (result) {
			router.push('/');
		} else {
			alert('그런 계정은 없답니다~');
		}
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Wrapper>
			<LoginBox>
				<StyledForm>
					<Header>LOGIN</Header>
					<StyledInputForm placeholder='아이디'></StyledInputForm>
					<StyledInputForm placeholder='비밀번호'></StyledInputForm>
					<StyledButton>전송</StyledButton>
					<StyledControl>
						<Checkbox>30일동안 기억하기</Checkbox>
						<Link href='/signup'>
							<a>회원가입</a>
						</Link>
					</StyledControl>
				</StyledForm>
			</LoginBox>
		</Wrapper>
	);
};

export default Login;
