import type {
	ListPostResponse,
	Post,
	PostCommentsResponse,
} from "src/types/posts";

const API_URL = "https://mini-instagram-api.mistcloud.workers.dev/api";
const API_KEY = "ivapikey123";
const HEADERS = { "x-api-key": API_KEY };

const fetchApi = async <T>(endpoint: string): Promise<T> => {
	const res = await fetch(`${API_URL}${endpoint}`, {
		headers: HEADERS,
		next: { revalidate: 60 },
	});
	return res.json();
};

export const getPostList = async (
	cursor?: string,
): Promise<ListPostResponse> => {
	const qs = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
	return fetchApi<ListPostResponse>(`/posts${qs}`);
};

export const getPostById = async (id: string): Promise<Post> =>
	fetchApi<Post>(`/posts/${id}`);

export const getPostComments = async (
	id: string,
): Promise<PostCommentsResponse> =>
	fetchApi<PostCommentsResponse>(`/comments/${id}`);

export const createPost = async (
	image: File | Blob,
	caption: string,
	author: string,
): Promise<Post> => {
	const formData = new FormData();
	formData.append("image", image);
	formData.append("caption", caption);
	formData.append("author", author);

	const res = await fetch(`${API_URL}/posts`, {
		method: "POST",
		headers: {
			"x-api-key": API_KEY,
		},
		body: formData,
	});
	if (!res.ok) throw new Error("Failed to create post");
	return res.json();
};
