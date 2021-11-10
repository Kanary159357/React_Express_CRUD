import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 100%;
`;

const UserImage = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: gray;
`;

const UserBox = ({ user_id }: { user_id: string }) => {
	return (
		<Wrapper>
			<UserImage />
			{user_id}
		</Wrapper>
	);
};

export default UserBox;
