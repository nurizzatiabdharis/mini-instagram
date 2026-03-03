// app/Dashbo.tsx
"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import useSWR from "swr";
import { Posts } from "./Posts";

type ApiData = {
	items: {
		id: string;
		author: string;
		imageUrl: string;
		caption: string;
		likes: number;
		createdAt: string;
	}[];
	nextCursor?: string;
	hasMore?: boolean;
	// add other fields you expect
};

const fetcher = async (url: string): Promise<ApiData> => {
	const res = await fetch(url, {
		headers: {
			"x-api-key": "ivapikey123",
		},
	});

	if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
	return res.json() as Promise<ApiData>;
};

export default function Dashboard({ initialData }: { initialData: ApiData }) {
	const { data, error, isLoading } = useSWR<ApiData>(
		"https://mini-instagram-api.mistcloud.workers.dev/api/posts",
		fetcher,
		{
			fallbackData: initialData,
			revalidateOnMount: false, // set true if you want immediate revalidation
		},
	);

	if (error) return <div>Error loading data</div>;
	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<Box
				sx={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					bgcolor: "background.paper",
					zIndex: 1100,
					boxShadow: 1,
					py: 2,
					px: 3,
					textAlign: "center",
				}}
			>
				<Typography variant="h5">Mini Instagram</Typography>
			</Box>
			<Box
				sx={{
					p: 5,
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
		</>
	);
}
