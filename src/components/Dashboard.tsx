"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import RouterLink from "next/link";
import { useGetPostsInfinite } from "src/swr/posts";
import { Iconify } from "src/theme/minimal/iconify";
import type { ListPostResponse } from "src/types/posts";
import ErrorDisplay from "./ErrorDisplay";
import Loader from "./Loader";
import PostItem from "./PostItem";

type Props = {
	initialData: ListPostResponse;
};

export default function Dashboard({ initialData }: Props) {
	const {
		items,
		size,
		setSize,
		isLoading,
		isValidating,
		error,
		isReachingEnd,
	} = useGetPostsInfinite(initialData);

	if (error) return <ErrorDisplay />;
	if (isLoading && items.length === 0) return <Loader />;
	return (
		<>
			<Box
				sx={{
					p: 2,
					pt: 10,
					gap: 1,
					display: "flex",
					alignContent: "center",
					justifyContent: "center",
					flexDirection: "column",
					margin: "0 auto",
					alignItems: "center",
				}}
			>
				<Grid container spacing={2} sx={{ p: 1 }} justifyContent="center">
					{items.map((item) => (
						<Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item.id}>
							<PostItem item={item} />
						</Grid>
					))}
				</Grid>
				<Button
					variant="contained"
					color="primary"
					disabled={isReachingEnd || isValidating}
					onClick={() => setSize(size + 1)}
					sx={{ padding: "10px 14px", width: "150px" }}
				>
					{isReachingEnd
						? "No more posts"
						: isValidating
							? "Loading…"
							: "Load more"}
				</Button>
			</Box>

			<Box
				sx={{
					position: "fixed",
					right: 30,
					bottom: 30,
					textAlign: "center",
					zIndex: 1200,
				}}
			>
				<Fab component={RouterLink} href={"/create"} color="primary">
					<Iconify width={24} icon="mingcute:add-line" />
				</Fab>
			</Box>
		</>
	);
}
