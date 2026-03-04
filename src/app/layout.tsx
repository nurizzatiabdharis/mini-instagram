import "src/globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import Header from "src/components/Header";
import SonnerToast from "src/components/SonnerToast";
import SWRProvider from "src/swr/SWRProvider";
import { ThemeProvider, themeConfig } from "src/theme";

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
			</body>
		</html>
	);
}
