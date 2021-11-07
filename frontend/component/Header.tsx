import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AppState } from '../lib/store';
import RoundLabel from './base/RoundLabel';
import { useEffect, useState, useLayoutEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
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
	text-align: center;
	flex: 1;
`;

const PostSearch = styled.div`
	border-bottom: 1px solid black;
	display: flex;
	height: 50px;
	flex: 4;
	margin: 0 20px;
	input {
		flex: 4;
		border: 0;
		outline: none;
		background: transparent;
	}
	div {
		flex: 1;
		font-size: 24px;
		line-height: 50px;
		cursor: pointer;
		vertical-align: middle;
		text-align: right;
	}
`;
const UserBox = styled(RoundLabel)`
	margin: 0 20px;
	cursor: pointer;
`;
const Header = () => {
	const user = useSelector((state: AppState) => state.authReducer);
	const [checkTop, setCheckTop] = useState(false);

	const handleScroll = () => {
		setCheckTop(window.scrollY > 70);
	};

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
				<PostSearch>
					<input></input>
					<div>
						<SearchOutlined />
					</div>
				</PostSearch>
				<UserBox fontColor={Palette.white} background={Palette.orange_1}>
					{user.isLogin ? user.userData?.username : '로그인하세요'}
				</UserBox>
			</Box>
		</Wrapper>
	);
};

export default Header;
