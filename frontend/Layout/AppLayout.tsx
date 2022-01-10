import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';

const Wrapper = styled.div`
	background: ${Palette.gray_0};
	min-height: calc(100%);
`;

const AppLayout: React.FC = ({ children }) => {
	return (
		<Wrapper>
			<main>{children}</main>
		</Wrapper>
	);
};

export default AppLayout;
