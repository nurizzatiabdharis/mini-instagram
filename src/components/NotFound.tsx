"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RouterLink from "next/link";
import PageNotFoundIllustration from "src/theme/illustrations/page-not-found-illustration";

export default function NotFound() {
	return (
		<Container sx={{ textAlign: "center", margin: "0 auto", pt: 10 }}>
			<Box>
				<Typography variant="h3" sx={{ mb: 2 }} data-testid="not-found-title">
					Sorry, page not found!
				</Typography>
			</Box>
			<Box>
				<Typography
					sx={{ color: "text.secondary" }}
					data-testid="not-found-description"
				>
					Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
					mistyped the URL? Be sure to check your spelling.
				</Typography>
			</Box>
			<Box>
				<PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
			</Box>
			<Button
				component={RouterLink}
				href="/"
				size="large"
				variant="contained"
				data-testid="go-home-button"
			>
				Go to home
			</Button>
		</Container>
	);
}
