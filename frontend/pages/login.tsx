import styled from 'styled-components';
import { useRef } from 'react';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
import RoundLabel from '../component/base/RoundLabel';
import StyledForm from '../component/base/StyledForm';
import StyledInput from '../component/base/StyledInput';
import useLoginMutation from '../lib/query/users/useLoginMutation';
const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoginBox = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid ${Palette.gray_1};
	border-radius: 16px;
	background: ${Palette.white};
	width: 500px;
	height: 300px;
	padding: 30px;
	box-shadow: 0 2px 10px rgb(0 0 0 / 0.2);
`;

const Header = styled.div`
	font-size: 40px;
	color: ${Palette.orange_1};
	font-weight: 800;
`;

const Button = styled.div`
	width: 80%;
`;

const Login = () => {
	const inputRef = useRef<{
		id: HTMLInputElement | null;
		password: HTMLInputElement | null;
	}>({
		id: null,
		password: null,
	});
	const loginMutation = useLoginMutation();
	const onFinish = () => {
		if (inputRef.current['id'] && inputRef.current['password']) {
			const id = inputRef.current['id'].value;
			const password = inputRef.current['password'].value;
			loginMutation.mutate({ id, password });
		} else {
			console.error('No inputRef!');
		}
	};

	return (
		<Wrapper>
			<LoginBox>
				<StyledForm>
					<Header>LOGIN</Header>
					<StyledInput
						placeholder='아이디'
						type='text'
						name='id'
						ref={(el) => (inputRef.current['id'] = el)}></StyledInput>
					<StyledInput
						placeholder='비밀번호'
						type='password'
						ref={(el) => (inputRef.current['password'] = el)}
						name='password'></StyledInput>
					<Button onClick={onFinish}>
						<RoundLabel background={Palette.orange_1} width='100%'>
							전송
						</RoundLabel>
					</Button>

					<div>
						<Link href='/signup'>
							<a>회원가입</a>
						</Link>
					</div>
				</StyledForm>
			</LoginBox>
		</Wrapper>
	);
};

export default Login;
