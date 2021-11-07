import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { logoutProcess } from '../lib/store/authSlice';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { logout } from '../lib/services/UserService';
const Wrapper = styled.div`
	width: 220px;
	height: 250px;
	background-color: ${Palette.white};
	border: 1px solid ${Palette.gray_1};
`;

const UserImageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	width: 220px;
	.ant-avatar {
		background: ${Palette.gray_1};
	}
`;

const ControlBox = styled.div`
	display: flex;
	font-size: 20px;
`;

const ControlItem = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	justify-content: center;
	font-size: 16px;
	align-items: center;
	.icon {
		font-size: 20px;
		text-align: center;
	}
	.sub {
		font-size: 16px;
	}
`;

const UserProfileBox = () => {
	const { isLogin, userData } = useSelector(
		(state: RootState) => state.authReducer
	);
	useEffect(() => {
		console.log(isLogin);
	}, [isLogin]);
	const dispatch = useDispatch();
	const logoutAction = useMutation(logout, {
		onSuccess: () => {
			dispatch(logoutProcess());
		},
	});
	return (
		<Wrapper>
			<UserImageBox>
				<div>{userData?.username}</div>
			</UserImageBox>
			{isLogin ? (
				<ControlBox>
					<ControlItem>
						<Link href='/mypage'>
							<a>
								<div className='icon'>
									<HomeOutlined />
								</div>
								<div className='sub'>마이페이지</div>
							</a>
						</Link>
					</ControlItem>
					<ControlItem onClick={() => logoutAction.mutate()}>
						<div className='icon'>
							<LogoutOutlined />
						</div>
						<div className='sub'>로그아웃</div>
					</ControlItem>
				</ControlBox>
			) : (
				<Link href='/login'>
					<a>로그인</a>
				</Link>
			)}
		</Wrapper>
	);
};

export default UserProfileBox;
