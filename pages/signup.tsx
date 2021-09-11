import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { API } from '../lib/utils/api';
import { Router, useRouter } from 'next/dist/client/router';
import { useDebounce } from '../lib/hooks/useDebounce';
import {
	idValidation,
	passwordValidation,
	usernameValidation,
} from '../lib/utils/validation';
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
	padding: 30px;
`;

const Header = styled.div`
	font-size: 24px;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 440px;
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

const Label = styled.div`
	margin-right: auto;
`;

interface InputProps {
	id: string;
	password: string;
	username: string;
}

const Signup = () => {
	const [inputs, setInputs] = useState<InputProps>({
		id: '',
		password: '',
		username: '',
	});
	const [passwordValid, setPasswordValid] = useState('');
	const router = useRouter();
	const { id, password, username } = inputs;
	const { dValue: debouncedId, debounceLoading } = useDebounce(id, 500);
	const { data: idCheckdata } = useQuery(
		['idCheck', debouncedId],
		() => API.get(`/signup/checkId/${debouncedId}`),
		{ enabled: debouncedId.length > 2 }
	);
	const loginResultMutation = useMutation(
		(content: any) => API.post('/signup', content),
		{
			onSuccess: () => {
				router.push('/login');
			},
			onError: (error: AxiosError) => {
				alert(error.response.data);
			},
		}
	);

	const onSubmit = () => {
		if (
			passwordValidation(password, passwordValid) &&
			idValidation(id) &&
			usernameValidation(username)
		) {
			loginResultMutation.mutate(inputs);
		} else {
			alert('입력을 확인하세요');
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		if (name == 'passwordValid') {
			setPasswordValid(value);
		}
		setInputs({
			...inputs,
			[name]: value,
		});
	};
	return (
		<Wrapper>
			<LoginBox>
				<StyledForm>
					<Header>SIGNUP</Header>
					<StyledInputForm
						name={'id'}
						value={id}
						onChange={onChange}
						placeholder='아이디'
						autoComplete='off'
					/>
					<div>영문, 숫자, 특수문자포함 8~15자</div>

					{debouncedId.length < 2 ? (
						<></>
					) : debounceLoading ? (
						<div>가능한지 알아보는중..</div>
					) : !idCheckdata?.data[0].cnt ? (
						<div>가능한 아이디입니다</div>
					) : (
						<div>불가능한 아이디입니다!</div>
					)}
					<StyledInputForm
						name={'username'}
						value={username}
						onChange={onChange}
						placeholder='닉네임'
					/>
					<div>영문, 숫자, 특수문자포함 8~15자</div>

					<StyledInputForm
						name={'password'}
						value={password}
						onChange={onChange}
						type='password'
						placeholder='비밀번호'
					/>
					<StyledInputForm
						name={'passwordValid'}
						value={passwordValid}
						onChange={onChange}
						type='password'
						placeholder='비밀번호 확인'
					/>
					<div>영문, 숫자, 특수문자포함 8~15자</div>
					{passwordValidation(password, passwordValid) ? (
						<div>사용가능한 비밀번호입니다</div>
					) : (
						<div>잘못된 비밀번호입니다</div>
					)}
					<StyledButton onClick={onSubmit}>전송</StyledButton>
				</StyledForm>
			</LoginBox>
		</Wrapper>
	);
};

export default Signup;
