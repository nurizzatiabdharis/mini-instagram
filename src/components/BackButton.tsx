import Button from "@mui/material/Button";
import RouterLink from "next/link";
import { Iconify } from "src/theme/minimal/iconify";

export default function BackButton() {
	return (
		<Button
			component={RouterLink}
			href={"/"}
			startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
		>
			Back
		</Button>
	);
}
