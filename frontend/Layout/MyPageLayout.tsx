import styled from 'styled-components';
import MainLayout from '../Layout/MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const MyPageControl = styled.div`
	display: flex;
	flex-direction: row;
	margin: 50px 0;
`;

const Title = styled.div`
	font-size: 24px;
	margin-right: 30px;
	a {
		display: inline-block;
		position: relative;
		padding: 5px 5px;
		&::before {
			content: '';
			position: absolute;
			display: block;
			width: 100%;
			height: 2px;
			bottom: 0;
			left: 0;
			background-color: #000;
			transform: scaleX(0);
			transition: transform 0.3s ease;
		}
		&:hover::before {
			transform: scaleX(1);
		}
	}
	.active:before {
		transform: scaleX(1);
	}
`;

const MyPageLayout = ({ children }) => {
	const { asPath } = useRouter();

	return (
		<MainLayout>
			<Wrapper>
				<MyPageControl>
					<Title>
						<Link href='/mypage'>
							<a className={asPath === '/mypage' ? 'active' : ''}>내가 쓴 글</a>
						</Link>
					</Title>
					<Title>
						<Link href='/account'>
							<a className={asPath === '/account' ? 'active' : ''}>내 정보</a>
						</Link>
					</Title>
				</MyPageControl>
				<>{children}</>
			</Wrapper>
		</MainLayout>
	);
};

export default MyPageLayout;
