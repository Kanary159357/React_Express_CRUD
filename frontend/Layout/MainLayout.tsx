import styled from 'styled-components';
import Header from '../component/Header';

const Wrapper = styled.div`
	width: 626px;
	margin: 0 auto;
`;

const MainLayout = ({ children }) => {
	return (
		<>
			<Header />
			<Wrapper>{children}</Wrapper>
		</>
	);
};

export default MainLayout;
