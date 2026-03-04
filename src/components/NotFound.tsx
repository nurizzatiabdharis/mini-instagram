"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RouterLink from "next/link";
import { useTranslation } from "react-i18next";
import PageNotFoundIllustration from "src/theme/illustrations/page-not-found-illustration";

export default function NotFound() {
	const { t } = useTranslation();

	return (
		<Container sx={{ textAlign: "center", margin: "0 auto", pt: 10 }}>
			<Box>
				<Typography variant="h3" sx={{ mb: 2 }} data-testid="not-found-title">
					{t("error.pageNotFound")}
				</Typography>
			</Box>
			<Box>
				<Typography
					sx={{ color: "text.secondary" }}
					data-testid="not-found-description"
				>
					{t("error.notFoundDescription")}
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
				{t("button.goHome")}
			</Button>
		</Container>
	);
}
