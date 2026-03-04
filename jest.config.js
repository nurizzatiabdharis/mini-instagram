import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./",
});

const config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^@components/(.*)$": "<rootDir>/src/components/$1",
		"^@theme/(.*)$": "<rootDir>/src/theme/$1",
		"^@swr/(.*)$": "<rootDir>/src/swr/$1",
		"^@services/(.*)$": "<rootDir>/src/services/$1",
	},

	setupFilesAfterEnv: ["<rootDir>/__tests__/setupJestTests.ts"],
	modulePathIgnorePatterns: [
		"<rootDir>/__tests__/setupJestTests.ts",
		"<rootDir>/__tests__/testUtils.tsx",
	],
};

export default createJestConfig(config);
