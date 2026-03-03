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

export const getPostList = async (): Promise<ListPostResponse> =>
	fetchApi<ListPostResponse>("/posts");

export const getPostById = async (id: string): Promise<Post> =>
	fetchApi<Post>(`/posts/${id}`);

export const getPostComments = async (
	id: string,
): Promise<PostCommentsResponse> =>
	fetchApi<PostCommentsResponse>(`/comments/${id}`);
