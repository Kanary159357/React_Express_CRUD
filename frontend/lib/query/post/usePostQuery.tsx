import { useQuery } from 'react-query';
import { getPost } from '../../services/PostService';
import { Post } from '../../types/Post';

const usePostQuery = (id: string) => {
	return useQuery<Post>('post', () => getPost(id));
};
export default usePostQuery;
