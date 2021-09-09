import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
const Wrapper = styled.div`
	height: 70px;
	border-bottom: 1px solid ${Palette.gray_1};
	background: ${Palette.white};
`;

const Box = styled.div`
	width: 940px;
	line-height: 70px;
	margin: 0 auto;
`;

const Title = styled.div`
	font-size: 24px;
`;

const Header = () => {
	return (
		<Wrapper>
			<Box>
				<Title>
					<Link href='/'>
						<a>GulMuk</a>
					</Link>
				</Title>
			</Box>
		</Wrapper>
	);
};

export default Header;
