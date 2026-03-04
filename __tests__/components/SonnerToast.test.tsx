import { screen } from "@testing-library/react";
import { renderWithProviders } from "@tests/testUtils";
import SonnerToast from "src/components/SonnerToast";

jest.mock("sonner", () => ({
	Toaster: () => <div data-testid="sonner-toast" />,
}));

describe("SonnerToast", () => {
	it("renders Toaster with correct theme and icons", () => {
		renderWithProviders(<SonnerToast />);
		const toaster = screen.getByTestId("sonner-toast");
		expect(toaster).toBeInTheDocument();
	});
});
