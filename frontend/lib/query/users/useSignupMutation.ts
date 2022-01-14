import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { InputProps, signup } from '../../services/UserService';

const useSignupMutation = () => {
	const router = useRouter();
	return useMutation((content: InputProps) => signup(content), {
		onSuccess: () => router.push('/login'),
		onError: (error: AxiosError) => {
			console.log(error);
			alert(error);
		},
	});
};
export default useSignupMutation;
