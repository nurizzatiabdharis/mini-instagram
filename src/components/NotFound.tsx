"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { m } from "framer-motion";
import RouterLink from "next/link";
import Box from "node_modules/@mui/material/esm/Box/Box";
import PageNotFoundIllustration from "src/theme/illustrations/page-not-found-illustration";
// ----------------------------------------------------------------------

export function NotFound() {
	return (
		<Container sx={{ textAlign: "center", margin: "0 auto", pt: 10 }}>
			<Box>
				<Typography variant="h3" sx={{ mb: 2 }}>
					Sorry, page not found!
				</Typography>
			</Box>

			<Box>
				<Typography sx={{ color: "text.secondary" }}>
					Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
					mistyped the URL? Be sure to check your spelling.
				</Typography>
			</Box>

			<Box>
				<PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
			</Box>

			<Button component={RouterLink} href="/" size="large" variant="contained">
				Go to home
			</Button>
		</Container>
	);
}
