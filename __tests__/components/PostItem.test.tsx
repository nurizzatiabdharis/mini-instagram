import { screen } from "@testing-library/react";
import { renderWithProviders } from "@tests/testUtils";
import PostItem from "src/components/PostItem";

describe("PostItem", () => {
	const post = {
		id: "1",
		imageUrl: "test.jpg",
		caption: "A test caption",
		author: "alice",
		likes: 42,
		createdAt: "2026-03-04T10:00:00.000Z",
	};

	it("renders author, caption, likes, and image", () => {
		renderWithProviders(<PostItem item={post} />);
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("A test caption")).toBeInTheDocument();
		expect(screen.getByText(/42 details.likes/)).toBeInTheDocument();
		expect(screen.getByTestId("post-image")).toHaveAttribute("src", "test.jpg");
	});

	it("renders icons", () => {
		renderWithProviders(<PostItem item={post} />);
		const eyeIcon = screen.getAllByTestId("mock-iconify")[0];
		expect(eyeIcon).toBeInTheDocument();
		const likeIcon = screen.getAllByTestId("mock-iconify")[1];
		expect(likeIcon).toBeInTheDocument();
	});
});
