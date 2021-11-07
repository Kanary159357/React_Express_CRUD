import styled from 'styled-components';
import { Palette } from '../../lib/styles/Theme';

interface SkeletonBoxProps {
	width: string;
	height: string;
}

const SkeletonDiv = styled.div<SkeletonBoxProps>`
	width: ${(props) => props.width || '50px'};
	height: ${(props) => props.height || '50px'};
	border-radius: 25px;
	background: ${Palette.gray_2};
	display: flex;
	position: relative;
	overflow: hidden;
	&::after {
		position: absolute;
		transform: translateX(-100%);
		border-radius: 2px;
		top: 0;
		left: 0;
		width: 100%;
		background: linear-gradient(
			90deg,
			rgba(196, 196, 196) 0,
			rgba(222, 222, 222, 0.2) 60%,
			rgba(222, 222, 222, 0.5) 80%,
			rgba(196, 196, 196, 0)
		);
		animation: shimmer 2s infinite;
		content: '';
		height: 100%;
		@keyframes shimmer {
			100% {
				transform: translateX(100%);
			}
		}
	}
`;

const SkeletonBox = (props: SkeletonBoxProps) => {
	return <SkeletonDiv {...props} />;
};

export default SkeletonBox;
