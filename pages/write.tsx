import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import MainLayout from '../Layout/MainLayout';
import { Button } from 'antd';
import { Descendant, Node } from 'slate';
import { API } from '../lib/utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
const Wrapper = styled.div`
	min-height: 800px;
`;
const ControlDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 30px;
	margin-top: -30px;
`;
const Editor = dynamic(() => import('../component/RichEditor'), {
	ssr: false,
});

const initialValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
];

export interface TitleAndDescription {
	title: string;
	description: Descendant[];
}
const Write = () => {
	const id = useSelector((state: RootState) => state.auth.userData.id);
	const serialize = (value): string => {
		return value.map((n) => Node.string(n)).join(' ');
	};

	const [post, setPost] = useState<TitleAndDescription>({
		title: '',
		description: initialValue,
	});
	const WritePost = () => {
		API.post('/write', {
			id,
			preview: serialize(post.description).substring(0, 200),
			title: post.title,
			post: {
				...post,
				description: JSON.stringify(post.description),
			},
		});
	};
	return (
		<MainLayout>
			<Editor post={post} setPost={setPost} />
			<ControlDiv>
				<Button onClick={WritePost}>작성</Button>
			</ControlDiv>
		</MainLayout>
	);
};

export default Write;
