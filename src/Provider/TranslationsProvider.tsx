"use client";

import { createInstance, type Resource } from "i18next";
import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import initTranslations from "src/app/i18n";

export default function TranslationsProvider({
	children,
	locale,
	namespaces,
	resources,
}: {
	children: ReactNode;
	locale: string;
	namespaces: string[];
	resources: Resource;
}) {
	const i18n = createInstance();

	initTranslations(locale, namespaces, i18n, resources);

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
