import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "__tests__/testUtils";
import NewPost from "src/components/NewPost";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
	useRouter: () => ({ push: mockPush }),
}));

jest.mock("sonner", () => ({
	toast: {
		success: jest.fn(),
		error: jest.fn(),
	},
}));

jest.mock("@services/api", () => {
	const createPost = jest.fn(() => Promise.resolve({}));
	return {
		__esModule: true,
		createPost,
		__mock: { createPost },
	};
});

jest.mock("@swr/posts", () => ({
	useGetPostsInfinite: () => ({ mutate: jest.fn() }),
}));

jest.mock("@theme/minimal/upload", () => ({
	Upload: (props: { onDrop: (files: File[]) => void }) => (
		<input
			data-testid="upload"
			type="file"
			onChange={(e) => {
				const files = e.target.files;
				if (files && files.length > 0) {
					props.onDrop(Array.from(files));
				} else {
					props.onDrop([
						new File(["dummy"], "test.jpg", { type: "image/jpeg" }),
					]);
				}
			}}
		/>
	),
}));

jest.mock("@components/CaptionInput", () => ({
	__esModule: true,
	default: (props: {
		caption: string;
		setCaption: (caption: string) => void;
	}) => (
		<input
			data-testid="caption-input"
			value={props.caption || ""}
			onChange={(e) => props.setCaption(e.target.value)}
		/>
	),
}));

const { __mock } = jest.requireMock("@services/api") as {
	__mock: { createPost: jest.Mock };
};
const mockCreatePost = __mock.createPost;
const { toast } = jest.requireMock("sonner");

describe("NewPost", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders form fields and submit button", () => {
		renderWithProviders(<NewPost />);
		expect(screen.getByPlaceholderText("Author")).toBeInTheDocument();
		expect(screen.getByTestId("caption-input")).toBeInTheDocument();
		expect(screen.getByTestId("upload")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
	});

	it("submits form and calls createPost, mutate, and router.push", async () => {
		renderWithProviders(<NewPost />);

		fireEvent.change(screen.getByPlaceholderText("Author"), {
			target: { value: "alice" },
		});

		fireEvent.change(screen.getByTestId("caption-input"), {
			target: { value: "Hello world!" },
		});

		fireEvent.change(screen.getByTestId("upload"));
		const submitBtn = screen.getByRole("button", { name: /Submit/i });
		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(mockCreatePost).toHaveBeenCalledWith(
				expect.any(File),
				"Hello world!",
				"alice",
			);
			expect(mockPush).toHaveBeenCalledWith("/");
			expect(toast.success).toHaveBeenCalledWith("Post created successfully!");
		});
	});

	it("shows error toast if createPost throw error", async () => {
		mockCreatePost.mockImplementationOnce(() =>
			Promise.reject(new Error("fail")),
		);
		renderWithProviders(<NewPost />);

		fireEvent.change(screen.getByPlaceholderText("Author"), {
			target: { value: "alice" },
		});
		fireEvent.change(screen.getByTestId("caption-input"), {
			target: { value: "Hello world!" },
		});
		fireEvent.change(screen.getByTestId("upload"));
		const submitBtn = screen.getByRole("button", { name: /Submit/i });
		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				"Failed to create post. Please try again.",
			);
		});
	});

	it("shows error toast if file format is not allowed", () => {
		renderWithProviders(<NewPost />);
		const file = new File(["dummy"], "test.txt", { type: "text/plain" });
		fireEvent.change(screen.getByTestId("upload"), {
			target: { files: [file] },
		});
		expect(toast.error).toHaveBeenCalledWith("Unsupported file format");
	});

	it("shows error toast if file size is too large", () => {
		renderWithProviders(<NewPost />);
		const bigFile = new File([new ArrayBuffer(1024 * 1024 + 1)], "big.jpg", {
			type: "image/jpeg",
		});
		fireEvent.change(screen.getByTestId("upload"), {
			target: { files: [bigFile] },
		});
		expect(toast.error).toHaveBeenCalledWith(
			"File size must be less than 1 MB.",
		);
	});
});
