import { render, screen } from "@testing-library/react";
import CommentItem from "src/components/CommentItem";

describe("CommentItem", () => {
	it("renders name, message, and postedAt", () => {
		render(
			<CommentItem
				name="alice"
				message="Hello world!"
				postedAt="2026-03-04T10:00:00.000Z"
			/>,
		);
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Hello world!")).toBeInTheDocument();
		expect(screen.getByText(/2026/)).toBeInTheDocument();
	});

	it("shows avatar with first letter capitalized", () => {
		render(
			<CommentItem
				name="bob"
				message="Nice post!"
				postedAt="2026-03-04T11:00:00.000Z"
			/>,
		);
		expect(screen.getByText("B")).toBeInTheDocument();
	});
});
