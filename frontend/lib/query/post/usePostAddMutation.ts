import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { TitleAndDescription } from '../../../pages/write';
import { writePost } from '../../services/PostService';

const usePostAddMutation = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	return useMutation(
		({ post }: { post: TitleAndDescription }) => writePost(post),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('postsList');
				router.push('/');
			},
			onError: () => {
				alert('업로드 실패');
			},
		}
	);
};

export default usePostAddMutation;
