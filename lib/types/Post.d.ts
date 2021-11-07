interface GetPosts {
	nextCursor: Number;
	posts: PostPreview[];
}

interface PostPreview {
	id: number;
	user_id: string;
	preview_text: string;
	created_at: Date;
	title: string;
}
