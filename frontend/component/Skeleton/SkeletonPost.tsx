import styled from 'styled-components';
import { Palette } from '../../lib/styles/Theme';
import SkeletonBox from './SkeletonBox';

const Wrapper = styled.div`
	margin: 30px;
	padding: 50px;
	height: 500px;
	border-radius: 25px;
	background: ${Palette.white};
	border: 1px solid ${Palette.gray_1};
	div {
		margin-bottom: 50px;
	}
`;

const SkeletonPost = () => {
	return (
		<Wrapper>
			<SkeletonBox height={'20px'} width={'400px'} />
			<SkeletonBox height={'20px'} width={'400px'} />
			<SkeletonBox height={'20px'} width={'400px'} />
			<SkeletonBox height={'20px'} width={'300px'} />
			<SkeletonBox height={'20px'} width={'300px'} />
		</Wrapper>
	);
};

export default SkeletonPost;
