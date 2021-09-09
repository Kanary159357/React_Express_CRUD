import styled from 'styled-components';

const Wrapper = styled.div`
	width: 940px;
	margin: 0 auto;
`;

const MainLayout = ({ children }) => {
	return (
		<Wrapper>
			<>{children}</>
		</Wrapper>
	);
};

export default MainLayout;
