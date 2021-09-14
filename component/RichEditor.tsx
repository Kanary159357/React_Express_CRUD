import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
	Editor,
	Transforms,
	createEditor,
	Descendant,
	Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';

import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import { Button } from 'antd';
import { TitleAndDescription } from '../pages/write';
import { RestFilled } from '@ant-design/icons';

const Wrapper = styled.div`
	margin: 30px;
	padding: 30px;
	background: ${Palette.white};
	border: 1px solid ${Palette.gray_1};
`;

const Title = styled.div`
	height: 100px;
	width: 100%;
	line-height: 100px;
	font-size: 24px;
	border-bottom: 1px solid ${Palette.gray_0};
`;

const TitleInput = styled.input`
	width: 100%;
	border: 0;
	height: 100px;
	font-size: 24px;
	&:focus {
		outline: none;
	}
	border-bottom: 1px solid ${Palette.gray_0};
`;

const EditorDiv = styled.div`
	margin-top: 50px;
`;

interface RichEditorProps {
	readOnly?: boolean;
	title?: string;
	text?: Descendant[];
	post: TitleAndDescription;
	setPost: (text: TitleAndDescription) => void;
}

const RichEditor = ({
	readOnly = false,
	text,
	post,
	setPost,
}: RichEditorProps) => {
	const [editor] = useState(() => withHistory(withReact(createEditor())));

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPost({ ...post, title: value });
	};

	return (
		<>
			<Wrapper>
				<>
					{readOnly ? (
						<Title>{post.title}</Title>
					) : (
						<TitleInput
							value={post.title}
							name={'title'}
							onChange={onChange}
							placeholder='제목을 입력해주세요..'
						/>
					)}
				</>
				<EditorDiv>
					<Slate
						editor={editor}
						value={post.description}
						onChange={(text) => setPost({ ...post, description: text })}>
						<Editable
							readOnly={readOnly}
							style={{ minHeight: '400px' }}
							placeholder='어떤 글을 작성하실건가요?'
						/>
					</Slate>
				</EditorDiv>
			</Wrapper>
		</>
	);
};

const initialValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
];
export default RichEditor;
