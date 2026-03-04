import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "__tests__/testUtils";
import CaptionInput from "src/components/CaptionInput";

jest.mock("emoji-picker-react", () => ({
	__esModule: true,
	default: (props: { onEmojiClick: (emoji: { emoji: string }) => void }) => (
		<div data-testid="emoji-picker">
			<button
				type="button"
				data-testid="emoji-btn"
				onClick={() => props.onEmojiClick({ emoji: "😀" })}
			/>
		</div>
	),
}));

describe("CaptionInput", () => {
	const setCaption = jest.fn();
	beforeEach(() => {
		jest.clearAllMocks();
		renderWithProviders(
			<CaptionInput caption="hello" setCaption={setCaption} />,
		);
	});

	it("renders input and emoji button", () => {
		expect(
			screen.getByPlaceholderText("What's on your mind?"),
		).toBeInTheDocument();
		expect(screen.getByText("😊")).toBeInTheDocument();
	});

	it("opens emoji picker modal when emoji clicked", () => {
		fireEvent.click(screen.getByText("😊"));
		expect(screen.getByTestId("emoji-picker")).toBeInTheDocument();
	});

	it("calls setCaption on input change", () => {
		fireEvent.change(screen.getByPlaceholderText("What's on your mind?"), {
			target: { value: "new caption" },
		});
		expect(setCaption).toHaveBeenCalledWith("new caption");
	});

	it("calls setCaption when emoji is picked", () => {
		fireEvent.click(screen.getByText("😊"));
		fireEvent.click(screen.getByTestId("emoji-btn"));
		expect(setCaption).toHaveBeenCalled();
	});
});
