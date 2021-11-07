import styled from 'styled-components';
import Header from '../component/Header';
import { Palette } from '../lib/styles/Theme';

const Wrapper = styled.div`
	background: ${Palette.gray_0};
	min-height: calc(100%);
`;

const AppLayout = ({ children }) => {
	return (
		<Wrapper>
			<Header />
			<main>{children}</main>
		</Wrapper>
	);
};

export default AppLayout;
