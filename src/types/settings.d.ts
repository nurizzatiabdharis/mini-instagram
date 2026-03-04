export type SettingsState = {
	mode: ThemeConfig["defaultMode"];
};

export type SettingsProviderProps = {
	defaultSettings: SettingsState;
	children: React.ReactNode;
	storageKey?: string;
};

export type SettingsContextValue = {
	state: SettingsState;
	setState: (updateValue: Partial<SettingsState>) => void;
};
