import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
import { PostProps } from './ArticleList';
const Wrapper = styled.div`
	padding: 15px;
`;

const ContentBox = styled.div`
	min-height: 150px;
	border: 1px solid ${Palette.gray_1};
	background: ${Palette.white};
	padding: 20px;
	box-sizing: border-box;
	display: flex;
`;

const ImageBox = styled.div`
	width: 108px;
	height: 108px;
	background: green;
	margin-right: 30px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 20px;
`;

const Description = styled.div`
	width: 400px;
	display: block;
	margin-top: 6px;
	div {
		max-height: 44px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		span {
			font-size: 14px;
			line-height: 22px;
		}
	}
`;

const SubDescription = styled.div`
	margin-top: 6px;
`;

const ArticleItem = ({ post }: { post: PostProps }) => {
	const { id, user_id, created_at, preview_text, title } = post;
	return (
		<Wrapper>
			<Link href={`/article/${id}`}>
				<a>
					<ContentBox>
						<ImageBox />
						<Content>
							<Title>{title}</Title>
							<Description>
								<div>
									<span>{preview_text}</span>
								</div>
							</Description>
							<SubDescription>
								{created_at} {user_id}
							</SubDescription>
						</Content>
					</ContentBox>
				</a>
			</Link>
		</Wrapper>
	);
};

export default ArticleItem;
