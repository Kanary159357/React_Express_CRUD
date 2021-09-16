import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import MainLayout from '../../../Layout/MainLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import { Node } from 'slate';
import { TitleAndDescription } from '../../write';
import { AxiosResponse } from 'axios';
import { API } from '../../../lib/utils/api';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { Button } from 'antd';
import { useRouter } from 'next/dist/client/router';
const Wrapper = styled.div`
	min-height: 800px;
`;

const Editor = dynamic(() => import('../../../component/RichEditor'), {
	ssr: false,
});
const ControlDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 30px;
	margin-top: -30px;
`;
const getPost = async (id: string) => {
	try {
		let { data }: AxiosResponse<any> = await API.get(`/article/${id}`);
		return data;
	} catch (err) {
		console.error(err);
	}
};
export async function getServerSideProps({
	params,
}: {
	params: { id: string };
}) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery('postEdit', () => getPost(params.id));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
const Edit = () => {
	const router = useRouter();
	const { id } = router.query;
	const user_id = useSelector((state: RootState) => state.auth.userData.id);
	const serialize = (value): string => {
		return value.map((n) => Node.string(n)).join(' ');
	};
	const { data, isLoading } = useQuery('postEdit', () => getPost(id as string));

	const [post, setPost] = useState<TitleAndDescription>({
		title: data[0].title,
		content: data[0].content,
	});
	const WritePost = () => {
		API.post(`/article/${id}/edit`, {
			user_id,
			preview_text: serialize(post.content).substring(0, 200),
			title: post.title,
			content: JSON.stringify(post.content),
		});
		router.push(`/article/${id}`);
	};
	return (
		<MainLayout>
			<Wrapper>
				{data && <Editor post={post} setPost={setPost} />}
				<ControlDiv>
					<Button onClick={WritePost}>작성</Button>
				</ControlDiv>
			</Wrapper>
		</MainLayout>
	);
};

export default Edit;
