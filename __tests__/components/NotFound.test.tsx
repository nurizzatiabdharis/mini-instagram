import { screen } from "@testing-library/react";
import { renderWithProviders } from "__tests__/testUtils";
import NotFound from "src/components/NotFound";

jest.mock("@theme/illustrations/page-not-found-illustration", () => ({
	__esModule: true,
	default: () => <div data-testid="not-found-illustration" />,
}));

describe("NotFound", () => {
	it("renders not found title, description, illustration, and button", () => {
		renderWithProviders(<NotFound />);
		expect(screen.getByTestId("not-found-title")).toBeInTheDocument();
		expect(screen.getByTestId("not-found-description")).toBeInTheDocument();
		expect(screen.getByTestId("not-found-illustration")).toBeInTheDocument();
		expect(screen.getByTestId("go-home-button")).toBeInTheDocument();
	});
});
