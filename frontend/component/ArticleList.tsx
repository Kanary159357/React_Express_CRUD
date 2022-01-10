import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import ArticleItem from './ArticleItem';

import useIntersectionObserver from '../lib/hooks/useIntersectionObserver';
import React, { useRef, useState } from 'react';
import { QueryObject } from '../lib/services/PostService';
import SkeletonBox from './Skeleton/SkeletonBox';

import usePostsListQuery from '../lib/query/post/usePostsListQuery';

const Wrapper = styled.div`
	width: 626px;
	box-shadow: 0 2px 10px rgb(0 0 0 / 0.2);
	border-radius: 25px;
`;

const ListControlBox = styled.div`
	display: flex;
	padding: 0 30px;
	height: 73px;
	background: gray;
	border-radius: 25px 25px 0px 0px;
`;

const CustomSelect = styled.select`
	&:active,
	&:focus {
		outline: none;
		background: gray;
	}
	option {
		&:hover,
		&:focus {
			background: black;
		}
	}
	margin-left: auto;
	outline: none;

	font-family: inherit;
	font-size: inherit;
	cursor: inherit;
	line-height: inherit;
	background-color: transparent;
	border: none;
	padding: 0 1em 0 0;
`;

const ContentBox = styled.div`
	background: ${Palette.white};
	padding: 0 30px 60px 30px;
	border-radius: 0 0 25px 25px;
`;

const EmptyBox = styled.div`
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
`;

const SkeletonItem = styled.div`
	height: 215px;
	padding: 30px 0px;

	div {
		margin-bottom: 20px;
	}
	border-bottom: 1px solid ${Palette.gray_4};
	margin-bottom: -1px;
`;

export type OrderProps = 'asc' | 'desc';

const ArticleList = ({ query }: { query?: QueryObject }) => {
	const scrollRef = useRef(null);
	const [order, setOrder] = useState<OrderProps>('desc');
	const { data, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
		usePostsListQuery(query, order);

	const onOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setOrder(e.target.value as OrderProps);
	};
	useIntersectionObserver(scrollRef, () => hasNextPage && fetchNextPage());
	return (
		<Wrapper>
			<ListControlBox>
				<CustomSelect value={order} onChange={onOrderChange}>
					<option value='desc'>내림차순</option>
					<option value='asc'>오름차순</option>
				</CustomSelect>
			</ListControlBox>
			<ContentBox>
				{!data || isError ? (
					new Array(4).fill(1).map((_, i) => (
						<SkeletonItem key={i}>
							<SkeletonBox height={'20px'} width={'300px'} />
							<SkeletonBox height={'20px'} width={'300px'} />
							<SkeletonBox height={'20px'} width={'300px'} />
						</SkeletonItem>
					))
				) : data?.pages[0].posts.length == 0 ? (
					<EmptyBox>Empty!</EmptyBox>
				) : (
					data?.pages.map((page) =>
						page.posts?.map((item, i) =>
							i !== page.posts.length - 1 ? (
								<ArticleItem key={item.id} post={item} />
							) : (
								<ArticleItem key={item.id} post={item} ref={scrollRef} />
							)
						)
					)
				)}
				{isFetchingNextPage &&
					new Array(4).fill(1).map((_, i) => (
						<SkeletonItem key={i}>
							<SkeletonBox height={'20px'} width={'300px'} />
							<SkeletonBox height={'20px'} width={'300px'} />
							<SkeletonBox height={'20px'} width={'300px'} />
						</SkeletonItem>
					))}
			</ContentBox>
		</Wrapper>
	);
};

export default ArticleList;
