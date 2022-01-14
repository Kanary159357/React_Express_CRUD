import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { editPost } from '../../services/PostService';

const usePostEditMutation = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	return useMutation(editPost, {
		onSuccess: async () => {
			await queryClient.refetchQueries('postsList');
			router.push(`/`);
		},
		onError: (e) => {
			console.log(e);
			alert('에러 발생!!');
		},
	});
};

export default usePostEditMutation;
