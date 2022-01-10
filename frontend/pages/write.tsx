import styled from 'styled-components';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import MainLayout from '../Layout/MainLayout';
import { Button } from 'antd';
import { Descendant } from 'slate';
import usePostAddMutation from '../lib/query/post/usePostAddMutation';

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
	title: string | undefined;
	content: Descendant[] | undefined;
}
const Write = () => {
	const [post, setPost] = useState<TitleAndDescription>({
		title: '',
		content: initialValue,
	});
	const mutation = usePostAddMutation();
	return (
		<MainLayout>
			<Editor post={post} setPost={setPost} readOnly={false} />
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
