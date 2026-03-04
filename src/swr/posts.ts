import { getPostById, getPostComments, getPostList } from "src/services/api";
import type {
	ListPostResponse,
	Post,
	PostCommentsResponse,
} from "src/types/posts";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex: number, previousPageData: ListPostResponse) => {
	if (pageIndex === 0) return ["posts", null];
	if (!previousPageData?.hasMore) return null;
	return ["posts", previousPageData.nextCursor];
};

export function useGetPostsInfinite(initialData?: ListPostResponse) {
	const swr = useSWRInfinite(
		getKey,
		([, cursor]) => getPostList(cursor ?? undefined),
		{
			revalidateFirstPage: false,
			revalidateOnFocus: false,
			fallbackData: initialData ? [initialData] : undefined,
		},
	);

	const pages = swr.data ?? [];
	const items = pages.flatMap((p) => p.items);
	const isReachingEnd =
		pages.length > 0 && pages[pages.length - 1]?.hasMore === false;

	return { ...swr, items, isReachingEnd };
}

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
