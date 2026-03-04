import Loader from "@components/Loader";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@tests/testUtils";

describe("Loader", () => {
	test("Should render loader", () => {
		renderWithProviders(<Loader />);
		expect(screen.getByTestId("loader")).toBeInTheDocument();
	});
});
