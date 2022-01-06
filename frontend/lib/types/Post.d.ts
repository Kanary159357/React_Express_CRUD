import { Descendant } from 'slate';

interface GetPosts {
	nextCursor: number;
	posts: PostPreview[];
}

interface Post {
	id: number;
	user_id: string;
	preview_text: string;
	created_at: Date;
	title: string;
	content: Descendant[];
}

type PostPreview = Omit<Post, 'content'>;
