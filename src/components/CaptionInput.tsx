import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import EmojiPicker, {
	type EmojiClickData,
	type Theme,
} from "emoji-picker-react";
import IconButton from "node_modules/@mui/material/esm/IconButton/IconButton";
import { useColorScheme } from "node_modules/@mui/material/esm/styles/ThemeProviderWithVars";
import { useState } from "react";
import { Iconify } from "src/theme/minimal/iconify";

type Props = {
	caption: string;
	setCaption: React.Dispatch<React.SetStateAction<string>>;
};

export default function CaptionInput({ caption, setCaption }: Props) {
	const { mode } = useColorScheme();
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const onClose = () => setOpen(false);

	const handleEmojiClick = (emojiData: EmojiClickData) => {
		setCaption((prev) => prev + emojiData.emoji);
	};

	return (
		<>
			<TextField
				fullWidth
				size="small"
				placeholder="What's on your mind?"
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment
								position="end"
								onClick={handleOpen}
								sx={{ cursor: "pointer" }}
							>
								😊
							</InputAdornment>
						),
					},
				}}
			/>
			<Modal open={open} onClose={onClose}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: "background.paper",
						borderRadius: 2,
						boxShadow: 24,
						p: 2,
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
						<IconButton onClick={onClose}>
							<Iconify width={16} icon="mingcute:close-line" />
						</IconButton>
					</Box>
					<EmojiPicker onEmojiClick={handleEmojiClick} theme={mode as Theme} />
				</Box>
			</Modal>
		</>
	);
}
