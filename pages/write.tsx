import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import MainLayout from '../Layout/MainLayout';
import { Button } from 'antd';
import { Descendant, Node } from 'slate';
import API from '../lib/utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { useMutation } from 'react-query';
import { Router, useRouter } from 'next/dist/client/router';
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
	content: Descendant[];
}
const Write = () => {
	const id = useSelector((state: RootState) => state.auth.userData.id);
	const router = useRouter();
	const [post, setPost] = useState<TitleAndDescription>({
		title: '',
		content: initialValue,
	});
	const WritePost = (id: string, post: TitleAndDescription) => {
		const serialize = (value): string => {
			return value.map((n) => Node.string(n)).join(' ');
		};
		return API.post('/write', {
			id,
			preview: serialize(post.content).substring(0, 200),
			title: post.title,
			content: JSON.stringify(post.content),
		});
	};
	const mutation = useMutation(
		({ id, post }: { id: string; post: TitleAndDescription }) =>
			WritePost(id, post),
		{
			onSuccess: (response) => {
				router.push(`/`);
			},
			onError: (e) => {
				alert('에러가 발생했습니다');
				router.push(`/`);
			},
		}
	);
	return (
		<MainLayout>
			<Editor post={post} setPost={setPost} />
			<ControlDiv>
				<Button
					onClick={() => {
						mutation.mutate({ id, post });
					}}>
					작성
				</Button>
			</ControlDiv>
		</MainLayout>
	);
};

export default Write;
