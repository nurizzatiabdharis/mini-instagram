"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { capitalize } from "@mui/material/utils";
import { useGetPostById, useGetPostComments } from "src/swr/posts";
import { Iconify } from "src/theme/minimal/iconify";
import { Image } from "src/theme/minimal/image";
import type { Post, PostCommentsResponse } from "src/types/posts";
import BackButton from "./BackButton";
import CommentItem from "./CommentItem";
import ErrorDisplay from "./ErrorDisplay";
import Loader from "./Loader";

type Props = {
	postId: string;
	postComments?: PostCommentsResponse;
	postInfo?: Post;
};

export default function Details({ postId, postComments, postInfo }: Props) {
	const { data, error, isLoading } = useGetPostComments(postId, postComments);
	const {
		data: info,
		error: postError,
		isLoading: postLoading,
	} = useGetPostById(postId, postInfo);
	if (error || postError) return <ErrorDisplay />;
	if (isLoading || postLoading || !info) return <Loader />;

	const items = data?.items || [];

	const renderImageAndInfo = () => (
		<Box sx={{ p: 2 }}>
			<Image
				alt={info.caption}
				src={info.imageUrl}
				ratio="1/1"
				sx={{ borderRadius: 1.5 }}
				data-testid="details-image"
			/>
			<Typography variant="h5" sx={{ mt: 2 }}>
				{info.caption}
			</Typography>
			<Typography variant="subtitle1" color="text.secondary">
				By {capitalize(info.author)} &bull;{" "}
				{new Date(info.createdAt).toLocaleString()}
			</Typography>
			<Box
				sx={{
					mt: 2,
					display: "flex",
					alignItems: "center",
					gap: 1,
				}}
			>
				<Iconify
					width={16}
					icon="solar:heart-bold"
					sx={{ flexShrink: 0, color: "error.main" }}
				/>
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
			<BackButton />
			<Grid container size={12}>
				<Grid size={{ xs: 12, md: 7, lg: 8 }}>{renderImageAndInfo()}</Grid>
				<Grid size={{ xs: 12, md: 5, lg: 4 }}>{renderComments()}</Grid>
			</Grid>
		</Box>
	);
}
