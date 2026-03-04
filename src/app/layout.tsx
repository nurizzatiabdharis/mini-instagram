import "src/globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import Header from "src/components/Header";
import SonnerToast from "src/components/SonnerToast";
import { SettingsProvider } from "src/context/SettingsProvider";
import SWRProvider from "src/swr/SWRProvider";
import { ThemeProvider, themeConfig } from "src/theme";
import type { SettingsState } from "src/types/settings";

export const defaultSettings: SettingsState = {
	mode: themeConfig.defaultMode,
};

export const metadata: Metadata = {
	title: "Mini Instagram",
	description: "Mini Instagram built with Next.js 14",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<InitColorSchemeScript
					defaultMode={themeConfig.defaultMode}
					modeStorageKey={themeConfig.modeStorageKey}
					attribute={themeConfig.cssVariables.colorSchemeSelector}
				/>
				<SettingsProvider defaultSettings={defaultSettings}>
					<AppRouterCacheProvider options={{ key: "css" }}>
						<ThemeProvider
							defaultMode={themeConfig.defaultMode}
							modeStorageKey={themeConfig.modeStorageKey}
						>
							<SWRProvider>
								<SonnerToast />
								<Header />
								{children}
							</SWRProvider>
						</ThemeProvider>
					</AppRouterCacheProvider>
				</SettingsProvider>
			</body>
		</html>
	);
}
