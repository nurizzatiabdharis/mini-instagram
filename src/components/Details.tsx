"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RouterLink from "next/link";
import { Iconify } from "src/minimal/iconify";
import { Image } from "src/minimal/image";
import useSWR from "swr";
import { CommentItem } from "./CommentItem";

type Comment = {
	id: string;
	postId: string;
	author: string;
	text: string;
	createdAt: string;
};

type DetailsResponse = {
	postId: string;
	items: Comment[];
};

const fetcher = async (url: string): Promise<DetailsResponse> => {
	const res = await fetch(url, {
		headers: {
			"x-api-key": "ivapikey123",
		},
	});
	if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
	return res.json();
};

export default function Details({
	postId,
	comments,
	postInfo,
}: {
	postId: string;
	comments?: Comment[];
	postInfo?: {
		id: string;
		imageUrl: string;
		caption: string;
		author: string;
		likes: number;
		createdAt: string;
	};
}) {
	const { data, error, isLoading } = useSWR<DetailsResponse>(
		`https://mini-instagram-api.mistcloud.workers.dev/api/comments/${postId}`,
		fetcher,
		{ fallbackData: comments ? { postId, items: comments } : undefined },
	);

	const postFetcher = async (url: string) => {
		const res = await fetch(url, {
			headers: { "x-api-key": "ivapikey123" },
		});
		if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
		return res.json();
	};

	const {
		data: postData,
		error: postError,
		isLoading: postLoading,
	} = useSWR(
		postInfo
			? null
			: `https://mini-instagram-api.mistcloud.workers.dev/api/posts/${postId}`,
		postFetcher,
	);

	if (error) return <div>Error loading comments</div>;
	if (isLoading) return <div>Loading comments...</div>;
	if (postError) return <div>Error loading post info</div>;
	if (postLoading && !postInfo) return <div>Loading post info...</div>;

	const items = data?.items || [];
	const info = postInfo || postData;

	const renderImageAndInfo = () => (
		<Box sx={{ p: 2 }}>
			<Image
				alt={info.caption}
				src={info.imageUrl}
				ratio="1/1"
				sx={{ borderRadius: 1.5 }}
			/>
			<Typography variant="h5" sx={{ mt: 2 }}>
				{info.caption}
			</Typography>
			<Typography variant="subtitle1" color="text.secondary">
				By {info.author} &bull; {new Date(info.createdAt).toLocaleString()}
			</Typography>
			<Box
				sx={{
					mt: 2,
					display: "flex",
					alignItems: "center",
					gap: 1,
				}}
			>
				<Iconify width={16} icon="solar:heart-bold" sx={{ flexShrink: 0 }} />
				<Typography variant="body2" color="text.secondary">
					{info.likes} likes
				</Typography>
			</Box>
		</Box>
	);

	const renderComments = () => (
		<Box
			sx={{
				m: 2,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				width: "100%",
			}}
		>
			<Typography variant="h6" gutterBottom>
				Comments
			</Typography>
			{items.length > 0 ? (
				items.map((comment) => (
					<CommentItem
						key={comment.id}
						name={comment.author}
						message={comment.text}
						postedAt={comment.createdAt}
					/>
				))
			) : (
				<Typography variant="body1" color="text.secondary">
					No comments found for this post.
				</Typography>
			)}
		</Box>
	);

	return (
		<Box
			sx={{
				p: 2,
				pt: 10,
				margin: "0 auto",
				width: "100%",
				maxWidth: 800,
			}}
		>
			<Button
				component={RouterLink}
				href={"/"}
				startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
			>
				Back to home
			</Button>

			<Grid container size={12}>
				<Grid size={{ xs: 12, md: 7, lg: 8 }}>{renderImageAndInfo()}</Grid>
				<Grid size={{ xs: 12, md: 5, lg: 4 }}>{renderComments()}</Grid>
			</Grid>
		</Box>
	);
}
