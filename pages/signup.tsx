import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import { useState } from 'react';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { API } from '../lib/utils/api';
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
	height: 400px;
	padding: 30px;
`;

const Header = styled.div`
	font-size: 24px;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 340px;
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
	const mutation = useMutation((content: any) => API.post('/signup', content), {
		onError: (error: AxiosError) => {
			alert(error.response.data);
		},
	});
	const onSubmit = () => {
		mutation.mutate(inputs);
	};
	const { id, password, username } = inputs;
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
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
					/>
					<StyledInputForm
						name={'username'}
						value={username}
						onChange={onChange}
						placeholder='닉네임'
					/>
					<StyledInputForm
						name={'password'}
						value={password}
						onChange={onChange}
						placeholder='비밀번호'
					/>
					<StyledButton onClick={onSubmit}>전송</StyledButton>
				</StyledForm>
			</LoginBox>
		</Wrapper>
	);
};

export default Signup;
