"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { usePopover } from "minimal-shared/hooks";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useTranslation } from "react-i18next";
import { i18nConfig } from "src/i18nConfig";
import { CustomPopover } from "src/theme/minimal/custom-popover";
import { Iconify } from "src/theme/minimal/iconify";

const LOCALES = [
	{ code: "en", name: "English" },
	{ code: "ms", name: "Malay" },
	{ code: "fr", name: "French" },
];

const setCookie = (name: string, value: string, days: number) => {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	document.cookie = `${name}=${value};${expires};path=/`;
};

export default function LanguageChanger() {
	const { i18n } = useTranslation();
	const currentLocale: string = i18n.language;
	const router = useRouter();
	const currentPathname: string = usePathname();
	const { open, anchorEl, onClose, onOpen } = usePopover();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		const newLocale: string = e.target.value;
		setCookie("NEXT_LOCALE", newLocale, 30);

		// redirect to the new locale path
		if (
			currentLocale === i18nConfig.defaultLocale &&
			!i18nConfig.prefixDefault
		) {
			router.push("/" + newLocale + currentPathname);
		} else {
			router.push(
				currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
			);
		}

		router.refresh();
	};

	return (
		<>
			<IconButton aria-label="Language selector" onClick={onOpen}>
				<Iconify icon="material-symbols:language" />
			</IconButton>
			<CustomPopover
				open={open}
				anchorEl={anchorEl}
				onClose={onClose}
				slotProps={{ arrow: { offset: 20 } }}
			>
				<Box>
					{LOCALES.map((loc) => {
						const isSelected = loc.code === currentLocale;
						return (
							<MenuItem
								key={loc.code}
								onClick={() =>
									handleChange({
										target: { value: loc.code },
									} as React.ChangeEvent<HTMLSelectElement>)
								}
								disableRipple
							>
								<Typography variant="body1">{ loc.name }</Typography>
								{isSelected ? <Iconify icon="eva:checkmark-fill" /> : null}
							</MenuItem>
						);
					})}
				</Box>
			</CustomPopover>
		</>
	);
}
