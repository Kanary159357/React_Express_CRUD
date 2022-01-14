import { Button } from 'antd';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';
import MainLayout from '../../../Layout/MainLayout';
import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { AppState, wrapper } from '../../../lib/store';
import { GetServerSidePropsContext } from 'next';
import { getServerArticle } from '../../api/article/[id]';
import usePostDeleteMutation from '../../../lib/query/post/usePostDeleteMutation';
import SkeletonPost from '../../../component/Skeleton/SkeletonPost';
import usePostQuery from '../../../lib/query/post/usePostQuery';
import { authSSR } from '../../../lib/utils/authSSR';

const ControlDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 30px;
	margin-top: -30px;
`;

const Editor = dynamic(() => import('../../../component/RichEditor'), {
	ssr: false,
	loading: function EditorLoadComponent() {
		return <SkeletonPost />;
	},
});
export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context: GetServerSidePropsContext) => {
		await authSSR(context, store);
		const { params } = context;
		const queryClient = new QueryClient();
		const customReq = { query: { id: params?.id || '' } };
		try {
			await queryClient.prefetchQuery('post', async () => {
				const { data } = await getServerArticle(customReq);
				return data;
			});
		} catch (e) {}
		return {
			props: {
				dehydratedState: dehydrate(queryClient),
			},
		};
	}
);

const Article = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data } = usePostQuery(id as string);
	const userData = useSelector((state: AppState) => state.authReducer.userData);
	const user_id = userData ? userData.id : null;
	const deleteMutation = usePostDeleteMutation();
	return (
		<>
			{data && (
				<MainLayout>
					{
						<Editor
							readOnly
							post={{
								title: data.title,
								content: data.content,
							}}
							created_at={data.created_at}
							title={data.title}
							user_id={data.user_id}
						/>
					}
					{user_id == data.user_id && (
						<ControlDiv>
							<Button>
								<Link href={`/article/${id as string}/edit`}>
									<a>수정</a>
								</Link>
							</Button>
							<Button onClick={() => deleteMutation.mutate(id as string)}>
								삭제
							</Button>
						</ControlDiv>
					)}
				</MainLayout>
			)}
		</>
	);
};

export default Article;
