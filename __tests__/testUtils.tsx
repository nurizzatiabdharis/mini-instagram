import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import type React from "react";
import type { JSX, PropsWithChildren } from "react";
import { SWRConfig } from "swr";

const testTheme = createTheme({
	palette: {
		primary: {
			main: "#1976d2",
		},
	},
});

export function renderWithProviders(ui: React.ReactElement) {
	function Wrapper({ children }: PropsWithChildren): JSX.Element {
		return (
			<ThemeProvider theme={testTheme}>
				<SWRConfig
					value={{
						provider: () => new Map(),
						isOnline: () => true,
						isVisible: () => true,
						initFocus: () => {},
						initReconnect: () => {},
						dedupingInterval: 0,
					}}
				>
					{children}
				</SWRConfig>
			</ThemeProvider>
		);
	}

	// Return an object with the store and all of RTL's query functions
	return { ...render(ui, { wrapper: Wrapper }) };
}
