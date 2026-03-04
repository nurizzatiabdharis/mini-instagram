import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@tests/testUtils";
import LanguageChanger from "src/components/LanguageChanger";

jest.mock("next/navigation", () => ({
	useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
	usePathname: () => "/fr/somepage",
}));

Object.defineProperty(document, "cookie", {
	writable: true,
	value: "",
});

describe("LanguageChanger", () => {
	it("renders language icon button", () => {
		renderWithProviders(<LanguageChanger />);
		expect(screen.getByLabelText(/Language selector/i)).toBeInTheDocument();
	});

	it("shows language options when clicked", () => {
		renderWithProviders(<LanguageChanger />);
		fireEvent.click(screen.getByLabelText(/Language selector/i));
		expect(screen.getByText(/English/)).toBeInTheDocument();
		expect(screen.getByText(/Malay/)).toBeInTheDocument();
		expect(screen.getByText(/French/)).toBeInTheDocument();
	});

	it("changes language and updates cookie", () => {
		renderWithProviders(<LanguageChanger />);

		fireEvent.click(screen.getByLabelText(/Language selector/i));
		fireEvent.click(screen.getByText(/Malay/));
		expect(document.cookie).toContain("NEXT_LOCALE=ms");
	});
});
