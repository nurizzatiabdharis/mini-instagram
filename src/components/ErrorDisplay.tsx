"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RouterLink from "next/link";
import { useTranslation } from "react-i18next";
import { ServerErrorIllustration } from "src/theme/illustrations";

export default function ErrorDisplay() {
	const { t } = useTranslation();

	return (
		<Container sx={{ textAlign: "center", margin: "0 auto", pt: 10 }}>
			<Box>
				<Typography variant="h3" sx={{ mb: 2 }}>
					{t("error.server")}
				</Typography>
			</Box>
			<Box>
				<Typography sx={{ color: "text.secondary" }}>
					{t("error.default")}
				</Typography>
			</Box>
			<Box>
				<ServerErrorIllustration sx={{ my: { xs: 5, sm: 10 } }} />
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
