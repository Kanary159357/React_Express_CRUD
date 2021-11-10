import {
	ReactChild,
	ReactChildren,
} from 'hoist-non-react-statics/node_modules/@types/react';
import styled from 'styled-components';

const Wrapper = styled.div<Props>`
	width: ${(props) => props.width || 'auto'};
	height: ${(props) => props.height || '50px'};
	padding: 0 15px;
	border-radius: 16px;
	box-sizing: border-box;
	border: 1px solid ${(props) => props.border || 'transparent'};
	background: ${(props) => props.background || 'transparent'};
	text-align: center;
	color: ${(props) => props.fontColor || 'black'};
	line-height: ${(props) => props.height || '50px'};
`;

interface RoundLabelProps {
	width: number;
	height: number;
	border: string;
	background: string;
	fontColor: string;
	children: ReactChild | ReactChildren;
	onClick: Function;
}

type Props = Partial<RoundLabelProps>;

const RoundLabel = (props: Props) => {
	const { onClick } = props;
	return (
		<Wrapper {...props} onClick={() => onClick}>
			{props.children}
		</Wrapper>
	);
};
export default RoundLabel;
