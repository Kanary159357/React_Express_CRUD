import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import ArticleItem from './ArticleItem';
import { Input } from 'antd';
import MainLayout from '../Layout/MainLayout';

const Wrapper = styled.div`
	width: 700px;
	padding: 20px;
`;

const ArticleList = () => {
	return (
		<Wrapper>
			<ArticleItem />
			<ArticleItem />
			<ArticleItem />
			<ArticleItem />
			<ArticleItem />
			<ArticleItem />
		</Wrapper>
	);
};

export default ArticleList;
