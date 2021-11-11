import React, { useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor, Descendant, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';

import styled from 'styled-components';
import { Palette } from '../lib/styles/Theme';
import { TitleAndDescription } from '../pages/write';
import UserBox from './UserBox';
import extractDate from '../lib/utils/extractDate';

const Wrapper = styled.div`
	margin: 30px;
	padding: 30px;
	border-radius: 25px;
	background: ${Palette.white};
	border: 1px solid ${Palette.gray_1};
`;

const Title = styled.div`
	height: 150px;
	width: 100%;
	align-items: center;
	display: flex;
	border-bottom: 1px solid ${Palette.gray_0};
	.main {
		display: flex;
		flex-direction: column;
		height: 100%;
		flex: 3;
		justify-content: space-between;
		div {
			flex: 3;
			font-size: 40px;
			display: flex;
			align-items: center;
		}
		span {
			flex: 1;
			display: flex;
			align-items: center;
		}
	}
	.sub {
		flex: 1;
		font-size: 16px;
	}
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
	post?: TitleAndDescription;
	user_id: string;
	created_at: Date;
	setPost?: (text: TitleAndDescription) => void;
}

const RichEditor = ({
	readOnly = false,
	text,
	title,
	user_id,
	created_at,
	post,
	setPost,
}: RichEditorProps) => {
	const [editor] = useState(() => withHistory(withReact(createEditor())));
	const { fullDate, fullTime } = extractDate(new Date(created_at));
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPost!({ ...post!, title: value });
	};
	const EditorChange = (text: Descendant[]) => {
		if (readOnly) {
		} else {
			setPost && setPost({ ...post!, content: text });
		}
	};
	return (
		<>
			<Wrapper>
				<>
					{readOnly ? (
						<Title>
							<div className='main'>
								<div>{title}</div>
								<span>{fullDate + ' ' + fullTime}</span>
							</div>
							<div className='sub'>
								<UserBox user_id={user_id} />
							</div>
						</Title>
					) : (
						<TitleInput
							value={post!.title}
							name={'title'}
							onChange={onChange}
							placeholder='제목을 입력해주세요..'
						/>
					)}
				</>
				<EditorDiv>
					<Slate
						editor={editor}
						value={text || post!.content}
						onChange={EditorChange}>
						<Editable
							readOnly={readOnly}
							spellCheck={false}
							autoCorrect={'false'}
							autoCapitalize={'false'}
							style={{ minHeight: '400px' }}
							placeholder='어떤 글을 작성하실건가요?'
						/>
					</Slate>
				</EditorDiv>
			</Wrapper>
		</>
	);
};

export default RichEditor;
