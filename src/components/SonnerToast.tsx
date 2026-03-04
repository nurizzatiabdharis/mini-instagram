"use client";

import { useColorScheme } from "@mui/material/styles";
import { Toaster } from "sonner";
import { Iconify } from "src/theme/minimal/iconify";

export default function SonnerToast() {
	const { mode } = useColorScheme();

	return (
		<Toaster
			theme={mode}
			icons={{
				success: (
					<Iconify
						icon="solar:check-circle-bold"
						sx={{ color: "success.main" }}
					/>
				),
				error: (
					<Iconify icon="solar:danger-bold" sx={{ color: "error.main" }} />
				),
			}}
			data-testid="sonner-toast"
		/>
	);
}
