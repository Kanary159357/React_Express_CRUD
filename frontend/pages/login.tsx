import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';
import { useRef } from 'react';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { loginProcess } from '../lib/store/authSlice';
import { http } from '../lib/utils/serverLessAPI';
import { login } from '../lib/services/UserService';
import { useMutation } from 'react-query';
import RoundLabel from '../component/base/RoundLabel';
import StyledForm from '../component/base/StyledForm';
import StyledInput from '../component/base/StyledInput';
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
	const router = useRouter();
	const dispatch = useDispatch();
	const inputRef = useRef<{
		id: HTMLInputElement | null;
		password: HTMLInputElement | null;
	}>({
		id: null,
		password: null,
	});
	const loginMutation = useMutation(
		({ id, password }: { id: string; password: string }) =>
			login({ id, password }),
		{
			onSuccess: (variables) => {
				const { username, success, id, token: accessToken } = variables!;
				if (success) {
					console.log(username, success, accessToken);
					const bearer = `Bearer ${accessToken}`;
					http.defaults.headers.Authorization = bearer;
					dispatch(
						loginProcess({
							userData: { id, username },
							accessToken,
							isLogin: true,
						})
					);
					router.push('/');
				} else {
					alert('그런 계정은 없답니다~');
				}
			},
			onError: () => {
				alert('에러가 발생했습니다');
			},
		}
	);
	const onFinish = async () => {
		const id = inputRef.current['id']!.value;
		const password = inputRef.current['password']!.value;
		loginMutation.mutate({ id, password });
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
