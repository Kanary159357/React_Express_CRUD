import { RowDataPacket } from 'mysql2';
export interface AccountProps extends RowDataPacket {
	id: string;
	username: string;
	registration_date: Date;
}
export interface Post extends RowDataPacket {
	id: string;
	user_id: string;
	preview_text: string;
	title: string;
	created_at: Date;
}
export interface PostLineProps {
	children?: PostLineProps[];
	text: string;
	type: string;
}

export interface ArticleProps extends RowDataPacket {
	id: string;
	post: PostLineProps[];
	preview: string;
	title: string;
}
