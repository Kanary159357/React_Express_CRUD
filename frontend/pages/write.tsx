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
import { AxiosError } from 'axios';
import { writePost } from '../lib/services/PostService';
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
	const router = useRouter();
	const [post, setPost] = useState<TitleAndDescription>({
		title: '',
		content: initialValue,
	});

	const mutation = useMutation(
		({ post }: { post: TitleAndDescription }) => writePost(post),
		{
			onSuccess: (response) => {
				router.push(`/`);
			},
			onError: (e: AxiosError) => {
				alert('에러가 발생했습니다');
				console.log(e.message);
			},
		}
	);
	return (
		<MainLayout>
			<Editor post={post} setPost={setPost} />
			<ControlDiv>
				<Button
					onClick={() => {
						mutation.mutate({ post });
					}}>
					작성
				</Button>
			</ControlDiv>
		</MainLayout>
	);
};

export default Write;
