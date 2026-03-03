"use client";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
	return (
		<Box
			sx={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<CircularProgress />
		</Box>
	);
}
