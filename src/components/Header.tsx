"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function Header() {
	return (
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
	);
}

export default Header;
