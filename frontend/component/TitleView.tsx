import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import UserBox from './UserBox';
import extractDate from '../lib/utils/extractDate';

const Title = styled.div`
	height: 150px;
	width: 100%;
	align-items: center;
	display: flex;
	border-bottom: 1px solid ${Palette.gray_0};
	.main {
		display: flex;
		flex-direction: column;
		height: 100%;
		flex: 3;
		justify-content: space-between;
		div {
			flex: 3;
			font-size: 40px;
			display: flex;
			align-items: center;
		}
		span {
			flex: 1;
			display: flex;
			align-items: center;
		}
	}
	.sub {
		flex: 1;
		font-size: 16px;
	}
`;

const TitleView = ({
	title,
	created_at,
	user_id,
}: {
	title: string;
	created_at: Date;
	user_id: string;
}) => {
	const calTime = extractDate(new Date(created_at));

	return (
		<Title>
			<div className='main'>
				<div>{title}</div>
				<span>{calTime.fullDate + ' ' + calTime.fullTime}</span>
			</div>
			<div className='sub'>
				<UserBox user_id={user_id} />
			</div>
		</Title>
	);
};

export default TitleView;
