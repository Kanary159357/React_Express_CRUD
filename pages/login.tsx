import { Button, Checkbox, Form, Input } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';
import useUser from '../lib/hooks/useUsers';
import { useState, useRef } from 'react';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
import API from '../lib/utils/api';
import { useDispatch } from 'react-redux';
import { loginProcess } from '../lib/store/authSlice';
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
interface UserAuthProps {
	success: boolean;
	token?: string;
	id: string;
	username: string;
}
const StyledControl = styled.div``;
const login = async (values: { id: string; password: string }) => {
	try {
		let { data }: AxiosResponse<UserAuthProps> = await API.post(
			`/login`,
			values
		);

		return data;
	} catch (err) {
		console.error(err);
	}
};
const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const inputRef = useRef({});
	const onFinish = async () => {
		const inputIdValue = inputRef.current['id'].state.value;
		const inputPasswordValue = inputRef.current['password'].state.value;
		const result = await login({
			id: inputIdValue,
			password: inputPasswordValue,
		});
		const { username, success, token } = result;
		if (success) {
			API.defaults.headers.common['Authorization'] = token;
			process.browser && localStorage.setItem('token', token);
			console.log(token);
			dispatch(loginProcess({ id: inputIdValue, username }));
			router.push('/');
		} else {
			alert('그런 계정은 없답니다~');
		}
	};

	return (
		<Wrapper>
			<LoginBox>
				<StyledForm>
					<Header>LOGIN</Header>
					<StyledInputForm
						placeholder='아이디'
						type='text'
						ref={(el) => (inputRef.current['id'] = el)}
						name='id'></StyledInputForm>
					<StyledInputForm
						placeholder='비밀번호'
						type='text'
						ref={(el) => (inputRef.current['password'] = el)}
						name='password'></StyledInputForm>
					<StyledButton onClick={onFinish}>전송</StyledButton>
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
