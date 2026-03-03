"use client";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import RouterLink from "next/link";
import { Iconify } from "src/minimal/iconify";
import { useGetPostList } from "src/swr/posts";
import type { ListPostResponse } from "src/types/posts";
import ErrorDisplay from "./ErrorDisplay";
import Loader from "./Loader";
import { Posts } from "./Posts";

export default function Dashboard({
	initialData,
}: {
	initialData: ListPostResponse;
}) {
	const { data, error, isLoading } = useGetPostList(initialData);

	if (error) return <ErrorDisplay />;
	if (isLoading) return <Loader />;
	return (
		<>
			<Box
				sx={{
					p: 2,
					pt: 10,
					gap: 2,
					display: "flex",
					alignContent: "center",
					justifyContent: "center",
					flexDirection: "column",
					margin: "0 auto",
					alignItems: "center",
				}}
			>
				<Posts
					subheader={`${data?.items.length} bookings`}
					list={data?.items || []}
				/>
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
