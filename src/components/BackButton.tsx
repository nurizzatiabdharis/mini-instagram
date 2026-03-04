import Button from "@mui/material/Button";
import RouterLink from "next/link";
import { useTranslation } from "react-i18next";
import { Iconify } from "src/theme/minimal/iconify";

export default function BackButton() {
	const { t } = useTranslation();

	return (
		<Button
			component={RouterLink}
			href={"/"}
			startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
			data-testid="back-button"
		>
			{t("button.back")}
		</Button>
	);
}
