import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import Link from 'next/link';
import React, { Ref } from 'react';
import UserBox from './UserBox';

const Wrapper = styled.div`
	padding: 30px 0;
	box-sizing: border-box;
	min-height: 215px;

	border-bottom: 1px solid ${Palette.gray_1};
	margin-bottom: -1px;
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const ContentBox = styled.div`
	display: flex;
	flex: 4;
`;

const MainBox = styled.div`
	flex: 4;
	display: flex;
	flex-direction: column;
`;

const SubBox = styled.div`
	flex: 1;
`;

const Title = styled.div`
	font-size: 20px;
	flex: 1;
`;

const TagBox = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	.item_4 {
		flex: 4;
	}
	.item_1 {
		flex: 1;
	}
`;

const Description = styled.div`
	flex: 3;
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

const ArticleItem = React.forwardRef(
	({ post }: { post: PostPreview }, ref: any) => {
		const { id, user_id, created_at, preview_text, title } = post;
		const date = created_at.toString().split('T')[0];
		return (
			<>
				<Link href={`/article/${id}`}>
					<a>
						<Wrapper ref={ref}>
							<ContentBox>
								<MainBox>
									<Title>{title}</Title>
									<Description>
										<div>
											<span>{preview_text}</span>
										</div>
									</Description>
								</MainBox>
								<SubBox>
									<UserBox user_id={user_id} />
								</SubBox>
							</ContentBox>
							<TagBox>
								<span className='item_4'>안녕 </span>
								<span className='item_1'>{date}</span>
							</TagBox>
						</Wrapper>
					</a>
				</Link>
			</>
		);
	}
);
ArticleItem.displayName = 'ArticleItem';
export default ArticleItem;
