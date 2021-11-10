import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import ArticleItem from './ArticleItem';
import { Input } from 'antd';
import MainLayout from '../Layout/MainLayout';
import useIntersectionObserver from '../lib/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { getPosts } from '../lib/services/PostService';
import { useInfiniteQuery } from 'react-query';
import { useEffect } from 'react';
import SkeletonBox from './Skeleton/SkeletonBox';

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

const SkeletonItem = styled.div`
	height: 215px;
	padding: 30px 0px;

	div {
		margin-bottom: 20px;
	}
	border-bottom: 1px solid ${Palette.gray_4};
	margin-bottom: -1px;
`;

const ArticleList = () => {
	const scrollRef = useRef(null);
	const { data, isLoading, hasNextPage, fetchNextPage } =
		useInfiniteQuery<GetPosts>('postsList', getPosts, {
			getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
		});

	useIntersectionObserver(scrollRef, () => hasNextPage && fetchNextPage());
	return (
		<Wrapper>
			<ListControlBox>
				<CustomSelect>
					<option value='최신순 정렬'>최신순 정렬</option>
					<option value='lime'>Lime</option>
					<option value='coconut'>Coconut</option>
					<option value='mango'>Mango</option>
				</CustomSelect>
			</ListControlBox>
			<ContentBox>
				{!data
					? new Array(4).fill(1).map((_, i) => (
							<SkeletonItem key={i}>
								<SkeletonBox height={'20px'} width={'300px'} />
								<SkeletonBox height={'20px'} width={'300px'} />
								<SkeletonBox height={'20px'} width={'300px'} />
							</SkeletonItem>
					  ))
					: data?.pages.map((page) =>
							page.posts.map((item, i) =>
								i !== page.posts.length - 1 ? (
									<ArticleItem key={item.id} post={item} />
								) : (
									<ArticleItem key={item.id} post={item} ref={scrollRef} />
								)
							)
					  )}
			</ContentBox>
		</Wrapper>
	);
};

export default ArticleList;
