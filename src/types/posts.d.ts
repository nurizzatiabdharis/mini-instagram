export type Post = {
	id: string;
	imageUrl: string;
	caption: string;
	author: string;
	likes: number;
	createdAt: string;
};

export type ListPostResponse = {
	items: Post[];
	nextCursor?: string;
	hasMore?: boolean;
};

export type Comment = {
	id: string;
	postId: string;
	author: string;
	text: string;
	createdAt: string;
};

export type PostCommentsResponse = {
	postId: string;
	items: Comment[];
};
