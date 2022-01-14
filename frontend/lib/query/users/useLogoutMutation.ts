import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/UserService';
import { logoutProcess } from '../../store/authSlice';

const useLogoutMutation = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	return useMutation(logout, {
		onSuccess: () => {
			dispatch(logoutProcess());
			router.push('/');
		},
		onError: () => {
			alert('에러가 발생했습니다');
		},
	});
};

export default useLogoutMutation;
