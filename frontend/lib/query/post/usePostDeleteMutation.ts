import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { http } from '../../utils/serverLessAPI';

const usePostDeleteMutation = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	return useMutation((id: string) => http.delete(`/api/article/${id}`), {
		onSuccess: async () => {
			await queryClient.refetchQueries('postsList', { exact: true });
			router.push('/');
		},
		onError: (e) => {
			console.log(e);
			alert('에러 발생!');
		},
	});
};

export default usePostDeleteMutation;
