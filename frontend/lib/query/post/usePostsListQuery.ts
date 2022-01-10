import { useInfiniteQuery } from 'react-query';
import { OrderProps } from '../../../component/ArticleList';
import { makeGetPostsFn, QueryObject } from '../../services/PostService';
import { GetPosts } from '../../types/Post';

const usePostsListQuery = (
	query: QueryObject | undefined,
	order: OrderProps
) => {
	return useInfiniteQuery<GetPosts>(
		['postsList', query, order],
		makeGetPostsFn({ ...(query ?? {}), order }),
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		}
	);
};
export default usePostsListQuery;
