import { screen } from "@testing-library/react";
import { renderWithProviders } from "__tests__/testUtils";
import Details from "src/components/Details";

const mockUseGetPostComments = jest.fn();
jest.mock("@swr/posts", () => ({
	useGetPostComments: () => mockUseGetPostComments(),
	useGetPostById: () => ({
		data: {
			id: "1",
			imageUrl: "test.jpg",
			caption: "A test caption",
			author: "alice",
			likes: 42,
			createdAt: "2026-03-04T10:00:00.000Z",
		},
		error: false,
		isLoading: false,
	}),
}));

jest.mock("@components/CommentItem", () => ({
	__esModule: true,
	default: () => <span data-testid="CommentItemMock" />,
}));

jest.mock("@components/ErrorDisplay", () => ({
	__esModule: true,
	default: () => <span data-testid="ErrorDisplayMock" />,
}));

jest.mock("@components/Loader", () => ({
	__esModule: true,
	default: () => <span data-testid="LoaderMock" />,
}));

describe("Details", () => {
	it("renders post info and comments", () => {
		mockUseGetPostComments.mockReturnValue({
			data: {
				items: [
					{
						id: "c1",
						author: "alice",
						text: "Nice post!",
						createdAt: "2026-03-04T12:00:00.000Z",
					},
				],
			},
			error: false,
			isLoading: false,
		});
		renderWithProviders(<Details postId="1" />);
		expect(screen.getByText("A test caption")).toBeInTheDocument();
		expect(screen.getByText(/details.by alice/i)).toBeInTheDocument();
		expect(screen.getByText(/42 details.likes/i)).toBeInTheDocument();
		expect(screen.getByTestId("details-image")).toHaveAttribute(
			"src",
			"test.jpg",
		);
		expect(screen.getByText("details.comments")).toBeInTheDocument();
		expect(screen.getByTestId("CommentItemMock")).toBeInTheDocument();
	});

	it("shows 'details.noComments' if items empty", () => {
		mockUseGetPostComments.mockReturnValue({
			data: {
				items: [],
			},
			error: false,
			isLoading: false,
		});
		renderWithProviders(<Details postId="1" />);
		expect(screen.getByText("details.noComments")).toBeInTheDocument();
	});

	it("renders ErrorDisplay when error is true", () => {
		mockUseGetPostComments.mockReturnValue({
			data: { items: [] },
			error: true,
			isLoading: false,
		});
		renderWithProviders(<Details postId="1" />);
		expect(screen.getByTestId("ErrorDisplayMock")).toBeInTheDocument();
	});

	it("renders Loader when isLoading is true", () => {
		mockUseGetPostComments.mockReturnValue({
			data: { items: [] },
			error: false,
			isLoading: true,
		});
		renderWithProviders(<Details postId="1" />);
		expect(screen.getByTestId("LoaderMock")).toBeInTheDocument();
	});
});
