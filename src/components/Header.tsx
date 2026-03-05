"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Iconify } from "src/theme/minimal/iconify";
import { Image } from "src/theme/minimal/image";
import LanguageChanger from "./LanguageChanger";

export default function Header() {
	const { t } = useTranslation();
	const { setMode, colorScheme } = useColorScheme();

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
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: 1,
				}}
			>
				<Image
					src="/assets/app-icon.png"
					alt="Logo"
					ratio="1/1"
					sx={{ width: "25px", height: "25px" }}
				/>
				<Typography variant="h5">{t("title")} 👋</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: 1,
				}}
			>
				<LanguageChanger />
				<IconButton
					sx={{ ml: 1 }}
					onClick={() => {
						setMode(colorScheme === "light" ? "dark" : "light");
					}}
					aria-label="Toggle mode"
				>
					<Iconify
						icon={
							colorScheme === "light" ? "solar:moon-bold" : "solar:sun-bold"
						}
					/>
				</IconButton>
			</Box>
		</Box>
	);
}
