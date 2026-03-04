import "src/globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "src/components/Header";
import SonnerToast from "src/components/SonnerToast";
import TranslationsProvider from "src/provider/TranslationsProvider";
import SWRProvider from "src/swr/SWRProvider";
import { ThemeProvider, themeConfig } from "src/theme";
import initTranslations from "../i18n";

export const metadata: Metadata = {
	title: "Mini Instagram",
	description: "Mini Instagram built with Next.js 14",
};

const i18nNamespaces = ["common"];

type LayoutProps = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: LayoutProps) {
	const { locale } = await params;
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<html lang={locale} suppressHydrationWarning>
			<body>
				<InitColorSchemeScript
					defaultMode={themeConfig.defaultMode}
					modeStorageKey={themeConfig.modeStorageKey}
					attribute={themeConfig.cssVariables.colorSchemeSelector}
				/>
				<AppRouterCacheProvider options={{ key: "css" }}>
					<TranslationsProvider
						namespaces={i18nNamespaces}
						locale={locale}
						resources={resources}
					>
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
					</TranslationsProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
