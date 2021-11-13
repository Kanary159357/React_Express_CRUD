import styled from 'styled-components';
import { Palette } from '../../lib/styles/Theme';

const StyledInput = styled.input`
	display: flex;
	outline: none;
	height: 50px;
	width: 80%;
	background: ${Palette.gray_0};
	flex-direction: row;
	border: none;
	&:focus {
		outline: none;
	}
`;

export default StyledInput;
