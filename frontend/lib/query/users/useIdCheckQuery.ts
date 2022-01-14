import { useQuery } from 'react-query';
import { signupCheckId } from '../../services/UserService';

const useIdCheckQuery = (id: string) => {
	return useQuery<boolean>(['idCheck', id], () => signupCheckId(id), {
		enabled: id.length > 2,
	});
};
export default useIdCheckQuery;
