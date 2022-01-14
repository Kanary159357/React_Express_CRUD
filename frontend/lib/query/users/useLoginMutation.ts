import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { login } from '../../services/UserService';
import { loginProcess } from '../../store/authSlice';
import { http } from '../../utils/serverLessAPI';

const useLoginMutation = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	return useMutation(
		({ id, password }: { id: string; password: string }) =>
			login({ id, password }),
		{
			onSuccess: (variables) => {
				const { username, success, id, token: accessToken } = variables;
				if (success) {
					const bearer = `Bearer ${accessToken as string}`;
					if (http.defaults.headers) {
						http.defaults.headers.Authorization = bearer;
					} else {
						console.error('No http default header');
					}
					dispatch(
						loginProcess({
							userData: { id, username },
							accessToken,
							isLogin: true,
						})
					);
					void router.push('/');
				} else {
					alert('그런 계정은 없답니다~');
				}
			},
			onError: () => {
				alert('에러가 발생했습니다');
			},
		}
	);
};

export default useLoginMutation;
