import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import Details from "src/components/Details";

type Props = {
	params: Promise<{ id: string }> | { id: string };
};

export default async function PostDetails({ params }: Props) {
	const { id } = await params;
	// Server-side fetch for comments
	const commentsRes = await fetch(
		`https://mini-instagram-api.mistcloud.workers.dev/api/comments/${id}`,
		{
			headers: {
				"x-api-key": "ivapikey123",
			},
			cache: "no-store",
		},
	);
	const details = commentsRes.ok
		? await commentsRes.json()
		: { postId: id, items: [] };

	// Server-side fetch for post info
	const postRes = await fetch(
		`https://mini-instagram-api.mistcloud.workers.dev/api/posts/${id}`,
		{
			headers: {
				"x-api-key": "ivapikey123",
			},
			cache: "no-store",
		},
	);
	const postInfo = postRes.ok ? await postRes.json() : null;

	return <Details postId={id} comments={details.items} postInfo={postInfo} />;
}
