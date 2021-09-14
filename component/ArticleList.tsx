import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import ArticleItem from './ArticleItem';
import { Input } from 'antd';
import MainLayout from '../Layout/MainLayout';

const Wrapper = styled.div`
	width: 700px;
	padding: 20px;
`;

interface PostsProps {
	posts: PostProps[];
}

export interface PostProps {
	id: number;
	user_id: string;
	post_preview: string;
	created_at: string;
}

const ArticleList = ({ posts }: PostsProps) => {
	return (
		<Wrapper>
			{posts.map((item) => {
				return <ArticleItem key={item.id} post={item} />;
			})}
		</Wrapper>
	);
};

export default ArticleList;
