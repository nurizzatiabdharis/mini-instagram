import BackButton from "@components/BackButton";
import { render, screen } from "@testing-library/react";

describe("BackButton", () => {
	test("Should render back button", () => {
		render(<BackButton />);
		expect(screen.getByTestId("back-button")).toBeInTheDocument();
		expect(screen.getByTestId("mock-iconify")).toBeInTheDocument();
	});
});
