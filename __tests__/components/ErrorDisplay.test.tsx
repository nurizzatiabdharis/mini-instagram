import { screen } from "@testing-library/react";
import { renderWithProviders } from "@tests/testUtils";
import ErrorDisplay from "src/components/ErrorDisplay";

jest.mock("@theme/illustrations", () => ({
	ServerErrorIllustration: () => (
		<div data-testid="server-error-illustration" />
	),
}));

describe("ErrorDisplay", () => {
	it("renders error message and button", () => {
		renderWithProviders(<ErrorDisplay />);
		expect(screen.getByText("error.server")).toBeInTheDocument();
		expect(screen.getByText("error.default")).toBeInTheDocument();
		expect(screen.getByTestId("go-home-button")).toBeInTheDocument();
		expect(screen.getByTestId("server-error-illustration")).toBeInTheDocument();
	});

	it("go home button functions correctly", () => {
		renderWithProviders(<ErrorDisplay />);
		const goHomeButton = screen.getByTestId("go-home-button");
		expect(goHomeButton).toHaveAttribute("href", "/");
		goHomeButton.click();
	});
});
