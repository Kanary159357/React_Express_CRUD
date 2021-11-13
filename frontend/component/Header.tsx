import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../lib/store';
import RoundLabel from './base/RoundLabel';
import { useEffect, useState, useLayoutEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { logout, useLogoutMutation } from '../lib/services/UserService';
import { Router, useRouter } from 'next/dist/client/router';
const Wrapper = styled.div<{ checkTop: boolean }>`
	height: 70px;
	position: sticky;
	top: 0;
	border-bottom: ${(props) => props.checkTop && `1px solid ${Palette.gray_1}`};
	background: ${(props) => (props.checkTop ? Palette.white : 'transparent')};
	opacity: ${(props) => props.checkTop && 0.99};
	transition: all 0.2s ease-in;
`;

const Box = styled.div`
	width: 840px;
	line-height: 70px;
	margin: 0 auto;
	align-items: center;
	display: flex;
	justify-content: space-between;
`;

const Title = styled.div`
	font-size: 24px;
	flex: 1;
	margin: 0 20px;
`;

const DropMenu = styled.div`
	position: relative;
	display: inline-block;
	.dropDiv {
		display: none;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		min-width: 160px;
		z-index: 1;
		background: ${Palette.white};
		border-radius: 25px;
		box-shadow: 0 2px 10px rgb(0 0 0 / 0.2);
		a {
			color: black;
			display: block;
			&:hover {
				background: ${Palette.gray_1};
			}
			&:last-child {
				border-radius: 0 0 25px 25px;
			}
			&:first-child {
				border-radius: 25px 25px 0 0;
			}
		}
	}
	&:hover {
		.dropDiv {
			display: block;
		}
	}
`;

const UserBox = styled(RoundLabel)`
	margin: 0 20px;
	cursor: pointer;
	min-width: 160px;
`;
const Header = () => {
	const user = useSelector((state: AppState) => state.authReducer);
	const [checkTop, setCheckTop] = useState(false);

	const handleScroll = () => {
		setCheckTop(window.scrollY > 70);
	};
	const logoutMutation = useLogoutMutation();
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
	return (
		<Wrapper checkTop={checkTop}>
			<Box>
				<Title>
					<Link href='/'>
						<a>CRUED</a>
					</Link>
				</Title>

				<UserBox fontColor={Palette.white} background={Palette.orange_1}>
					{user.isLogin ? (
						<DropMenu>
							{user.userData?.username}
							<div className='dropDiv'>
								<Link href='/mypage'>
									<a>마이페이지</a>
								</Link>
								<Link href='/'>
									<a onClick={() => logoutMutation.mutate()}>로그아웃</a>
								</Link>
								<Link href='/write'>
									<a>글쓰기</a>
								</Link>
							</div>
						</DropMenu>
					) : (
						<Link href='/login'>
							<a>로그인하세요</a>
						</Link>
					)}
				</UserBox>
			</Box>
		</Wrapper>
	);
};

export default Header;
