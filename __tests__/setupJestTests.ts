import "@testing-library/jest-dom";
import React, { type ReactNode } from "react";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: (key: string) => key,
			i18n: {
				language: "en",
			},
		};
	},
}));

jest.mock("@theme/minimal/iconify", () => ({
	__esModule: true,
	Iconify: () => React.createElement("span", { "data-testid": "mock-iconify" }),
}));

jest.mock("@theme/minimal/label", () => ({
	__esModule: true,
	Label: ({ children, color }: { children: ReactNode; color?: string }) =>
		React.createElement(
			"span",
			{ "data-testid": "LabelMock", "data-color": color },
			children,
		),
}));

jest.mock("@theme/minimal/image", () => ({
	__esModule: true,
	Image: (props: { src: string; alt?: string }) =>
		React.createElement("img", { "data-testid": "post-image", ...props }),
}));

jest.mock("@theme/minimal/custom-popover", () => ({
	__esModule: true,
	CustomPopover: ({ children }: { children: ReactNode }) =>
		React.createElement(
			"div",
			{ "data-testid": "CustomPopoverMock" },
			children,
		),
}));

jest.mock("minimal-shared/hooks", () => ({
	usePopover: () => ({
		open: true,
		anchorEl: null,
		onOpen: jest.fn(),
		onClose: jest.fn(),
	}),
}));
