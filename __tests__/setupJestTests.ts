import "@testing-library/jest-dom";
import React, { type ReactNode } from "react";

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
