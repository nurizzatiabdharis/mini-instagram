import { fireEvent, render, screen } from "@testing-library/react";
import Header from "src/components/Header";

jest.mock("@components/LanguageChanger", () => ({
	__esModule: true,
	default: () => <span data-testid="LanguageChangerMock" />,
}));

describe("Header", () => {
	it("renders logo and title", () => {
		render(<Header />);
		expect(screen.getByAltText("Logo")).toBeInTheDocument();
		expect(screen.getByText(/title/i)).toBeInTheDocument();
		expect(screen.getByTestId("LanguageChangerMock")).toBeInTheDocument();
	});

	it("renders toggle button", () => {
		render(<Header />);
		expect(screen.getByLabelText("Toggle mode")).toBeInTheDocument();
	});

	it("calls setMode and setState on toggle", () => {
		const { getByLabelText } = render(<Header />);
		fireEvent.click(getByLabelText("Toggle mode"));
	});
});
