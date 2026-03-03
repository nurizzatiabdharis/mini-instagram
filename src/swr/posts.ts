import { getPostById, getPostComments, getPostList } from "src/services/api";
import type {
	ListPostResponse,
	Post,
	PostCommentsResponse,
} from "src/types/posts";
import useSWR from "swr";

export const useGetPostList = (fallbackData?: ListPostResponse) =>
	useSWR("getPostList", async () => await getPostList(), {
		fallbackData: fallbackData ?? undefined,
		revalidateOnMount: false,
	});

export const useGetPostById = (id: string, fallbackData?: Post) =>
	useSWR(`getPostById-${id}`, async () => await getPostById(id), {
		fallbackData: fallbackData ?? undefined,
	});

export const useGetPostComments = (
	id: string,
	fallbackData?: PostCommentsResponse,
) =>
	useSWR(`getPostComments-${id}`, async () => await getPostComments(id), {
		fallbackData: fallbackData ?? undefined,
	});
