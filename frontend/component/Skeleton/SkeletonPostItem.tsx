import styled from 'styled-components';
import { Palette } from '../../lib/styles/Theme';
import SkeletonBox from './SkeletonBox';

const SkeletonItem = styled.div`
	height: 215px;
	padding: 30px 0px;

	div {
		margin-bottom: 20px;
	}
	border-bottom: 1px solid ${Palette.gray_4};
	margin-bottom: -1px;
`;

const SkeletonPostItem = () => {
	return (
		<SkeletonItem>
			<SkeletonBox height={'20px'} width={'300px'} />
			<SkeletonBox height={'20px'} width={'300px'} />
			<SkeletonBox height={'20px'} width={'300px'} />
		</SkeletonItem>
	);
};

export default SkeletonPostItem;
