import styled from 'styled-components';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import MainLayout from '../Layout/MainLayout';
import { Descendant } from 'slate';
import usePostAddMutation from '../lib/query/post/usePostAddMutation';
import RoundLabel from '../component/base/RoundLabel';
import { Palette } from '../lib/styles/Theme';

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
				<RoundLabel
					onClick={() => {
						mutation.mutate({ post });
					}}
					background={Palette.orange_1}
					fontColor={Palette.white}
					width='100px'>
					작성
				</RoundLabel>
			</ControlDiv>
		</MainLayout>
	);
};

export default Write;
