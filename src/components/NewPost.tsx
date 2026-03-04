"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createPost } from "src/services/api";
import { useGetPostsInfinite } from "src/swr/posts";
import { Iconify } from "src/theme/minimal/iconify";
import { Upload } from "src/theme/minimal/upload";
import BackButton from "./BackButton";
import CaptionInput from "./CaptionInput";

export default function NewPost() {
	const { mutate } = useGetPostsInfinite();
	const router = useRouter();
	const [author, setAuthor] = useState("");
	const [caption, setCaption] = useState("");
	const [file, setFile] = useState<File | string | null>(null);

	const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		if (!file) return;

		const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
		const fileExtension = file.name.split(".").pop()?.toLowerCase();

		if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
			toast.error("Unsupported file format");
			return;
		}

		if (file.size > 1024 * 1024) {
			toast.error("File size must be less than 1 MB.");
			return;
		}

		setFile(file);
	}, []);

	const onSubmit = async () => {
		if (!(file instanceof File)) return;
		try {
			await createPost(file, caption, author);
			toast.success("Post created successfully!");
			mutate();
			router.push("/");
		} catch (err) {
			console.error(err);
			toast.error("Failed to create post. Please try again.");
		}
	};

	return (
		<Box
			sx={{
				p: 2,
				pt: 10,
				margin: "0 auto",
				width: "100%",
				maxWidth: 800,
			}}
		>
			<BackButton />
			<Typography variant="h4" sx={{ my: 2 }}>
				New post
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					gap: 2,
				}}
			>
				<Upload
					value={file}
					onDrop={handleDropSingleFile}
					onDelete={() => setFile(null)}
				/>
				<TextField
					fullWidth
					size="small"
					placeholder="Author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
				<CaptionInput caption={caption} setCaption={setCaption} />
			</Box>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button
					variant="contained"
					sx={{ mt: 2 }}
					color="primary"
					startIcon={<Iconify width={16} icon="custom:send-fill" />}
					disabled={!caption || !file}
					onClick={onSubmit}
				>
					Submit
				</Button>
			</Box>
		</Box>
	);
}
