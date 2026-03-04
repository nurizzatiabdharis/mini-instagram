"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Iconify } from "src/theme/minimal/iconify";
import { Upload } from "src/theme/minimal/upload";
import BackButton from "./BackButton";

export default function NewPost() {
	const router = useRouter();
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

	const onSubmit = () => {
		console.log("Caption:", caption);
		console.log("File:", file instanceof File ? file.name : file);
		toast.success("Post created successfully!");
		router.push("/");
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
			<TextField
				fullWidth
				size="small"
				placeholder="What's on your mind?"
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
				multiline
				rows={3}
				sx={{ mb: 2 }}
			/>
			<Upload
				value={file}
				onDrop={handleDropSingleFile}
				onDelete={() => setFile(null)}
			/>
			<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
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
