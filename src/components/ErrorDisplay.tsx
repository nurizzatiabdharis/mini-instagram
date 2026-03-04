"use client";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import RouterLink from "next/link";
import { ServerErrorIllustration } from "src/theme/illustrations";

export default function ErrorDisplay() {
	return (
		<Container sx={{ textAlign: "center", margin: "0 auto", pt: 10 }}>
			<Box>
				<Typography variant="h3" sx={{ mb: 2 }}>
					500 Internal server error
				</Typography>
			</Box>
			<Box>
				<Typography sx={{ color: "text.secondary" }}>
					There was an error, please try again later.
				</Typography>
			</Box>
			<Box>
				<ServerErrorIllustration sx={{ my: { xs: 5, sm: 10 } }} />
			</Box>
			<Button component={RouterLink} href="/" size="large" variant="contained">
				Go to home
			</Button>
		</Container>
	);
}
