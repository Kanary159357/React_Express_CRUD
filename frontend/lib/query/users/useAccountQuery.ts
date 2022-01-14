import { useQuery } from 'react-query';
import { getAccountInfo } from '../../services/UserService';

const useAccountQuery = () => {
	return useQuery('account', getAccountInfo);
};
export default useAccountQuery;
