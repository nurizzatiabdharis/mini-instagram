"use client";

import { useLocalStorage } from "minimal-shared/hooks";
import { createContext, useContext, useMemo } from "react";
import type {
	SettingsContextValue,
	SettingsProviderProps,
	SettingsState,
} from "src/types/settings";

const SettingsContext = createContext<SettingsContextValue | undefined>(
	undefined,
);

export function SettingsProvider({
	children,
	defaultSettings,
	storageKey = "app-settings",
}: SettingsProviderProps) {
	const { state, setState } = useLocalStorage<SettingsState>(
		storageKey,
		defaultSettings,
	);
	const memoizedValue = useMemo(() => ({ state, setState }), [state, setState]);
	return (
		<SettingsContext.Provider value={memoizedValue}>
			{children}
		</SettingsContext.Provider>
	);
}

export function useSettingsContext() {
	const context = useContext(SettingsContext);
	if (!context)
		throw new Error("useSettingsContext must be used inside SettingsProvider");
	return context;
}
