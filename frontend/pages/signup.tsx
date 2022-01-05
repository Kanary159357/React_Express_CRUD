import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useDebounce } from '../lib/hooks/useDebounce';
import { idValidation, passwordValidation } from '../lib/utils/validation';
import { InputProps, signup, signupCheckId } from '../lib/services/UserService';
import StyledInput from '../component/base/StyledInput';
import RoundLabel from '../component/base/RoundLabel';
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
	font-size: 40px;
	color: ${Palette.orange_1};
	font-weight: 800;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 440px;
	align-items: center;
`;

const Button = styled.div`
	width: 80%;
	cursor: pointer;
`;

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
		() => signupCheckId(debouncedId),
		{ enabled: debouncedId.length > 2 }
	);
	const signupMutation = useMutation((content: InputProps) => signup(content), {
		onSuccess: () => {
			router.push('/login');
		},
		onError: (error: AxiosError) => {
			console.log(error);
			alert(error);
		},
	});

	const onSubmit = () => {
		if (passwordValidation(password, passwordValid) && idValidation(id)) {
			signupMutation.mutate(inputs);
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
					<StyledInput
						name={'id'}
						value={id}
						onChange={onChange}
						placeholder='아이디'
						autoComplete='off'
					/>
					{debouncedId.length < 2 ? (
						<></>
					) : debounceLoading ? (
						<div>가능한지 알아보는중..</div>
					) : idCheckdata && idCheckdata[0].cnt == 0 ? (
						<div>가능한 아이디입니다</div>
					) : (
						<div>불가능한 아이디입니다!</div>
					)}
					<StyledInput
						name={'username'}
						value={username}
						onChange={onChange}
						placeholder='닉네임'
					/>
					<StyledInput
						name={'password'}
						value={password}
						onChange={onChange}
						type='password'
						placeholder='비밀번호'
					/>
					<StyledInput
						name={'passwordValid'}
						value={passwordValid}
						onChange={onChange}
						type='password'
						placeholder='비밀번호 확인'
					/>
					<div>영문, 숫자, 특수문자포함 8~15자</div>
					{password.length > 8 &&
					passwordValidation(password, passwordValid) ? (
						<div>사용가능한 비밀번호입니다</div>
					) : (
						<div>잘못된 비밀번호입니다</div>
					)}
					<Button onClick={onSubmit}>
						{' '}
						<RoundLabel background={Palette.orange_1} width='100%'>
							전송
						</RoundLabel>
					</Button>
				</StyledForm>
			</LoginBox>
		</Wrapper>
	);
};

export default Signup;
