import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "__tests__/testUtils";
import Dashboard from "src/components/Dashboard";

jest.mock("@components/ErrorDisplay", () => ({
	__esModule: true,
	default: () => <span data-testid="ErrorDisplayMock" />,
}));

jest.mock("@components/Loader", () => ({
	__esModule: true,
	default: () => <span data-testid="LoaderMock" />,
}));

const baseMockData = {
	items: [
		{
			id: "1",
			imageUrl: "test.jpg",
			caption: "A test caption",
			author: "alice",
			likes: 42,
			createdAt: "2026-03-04T10:00:00.000Z",
		},
		{
			id: "2",
			imageUrl: "test2.jpg",
			caption: "Another caption",
			author: "bob",
			likes: 10,
			createdAt: "2026-03-04T11:00:00.000Z",
		},
	],
	size: 1,
	setSize: jest.fn(),
	isLoading: false,
	isValidating: false,
	error: false,
	isReachingEnd: false,
};

const mockUseAutomationAdminApi = jest.fn();
jest.mock("@swr/posts", () => ({
	useGetPostsInfinite: () => mockUseAutomationAdminApi(),
}));

const renderDashboard = (override = {}) => {
	mockUseAutomationAdminApi.mockReturnValue({ ...baseMockData, ...override });
	return renderWithProviders(
		<Dashboard initialData={{ items: [], nextCursor: "", hasMore: false }} />,
	);
};

describe("Dashboard", () => {
	it("renders posts and load more button", () => {
		renderDashboard();
		expect(screen.getByText("A test caption")).toBeInTheDocument();
		expect(screen.getByText("Another caption")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /loadMore/i }),
		).toBeInTheDocument();
	});

	it("calls setSize when load more button is clicked", () => {
		const setSizeMock = jest.fn();
		renderDashboard({
			items: [baseMockData.items[0]],
			setSize: setSizeMock,
		});
		const loadMoreButton = screen.getByRole("button", {
			name: /loadMore/i,
		});
		expect(loadMoreButton).not.toBeDisabled();
		fireEvent.click(loadMoreButton);
		expect(setSizeMock).toHaveBeenCalledWith(2);
	});

	it("renders ErrorDisplay when error is true", () => {
		renderDashboard({ error: true, items: [] });
		expect(screen.getByTestId("ErrorDisplayMock")).toBeInTheDocument();
	});

	it("renders Loader when isLoading is true", () => {
		renderDashboard({ isLoading: true, items: [] });
		expect(screen.getByTestId("LoaderMock")).toBeInTheDocument();
	});

	it("renders No more posts button when isReachingEnd is true", () => {
		renderDashboard({ isReachingEnd: true });
		const noMorePostsButton = screen.getByRole("button", {
			name: /noMorePosts/i,
		});
		expect(noMorePostsButton).toBeInTheDocument();
		expect(noMorePostsButton).toBeDisabled();
	});

	it("renders Loading button when isValidating is true", () => {
		renderDashboard({ isValidating: true });
		const loadingButton = screen.getByRole("button", {
			name: /loading/i,
		});
		expect(loadingButton).toBeInTheDocument();
		expect(loadingButton).toBeDisabled();
	});
});
