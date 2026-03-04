import type { SxProps, Theme } from "@mui/material/styles";
import type { DropzoneOptions } from "react-dropzone";
import type { UploadWrapper } from "./styles";

// ----------------------------------------------------------------------

export type FileUploadType = File | string | null;
export type FilesUploadType = (File | string)[];

export type UploadProps = DropzoneOptions & {
	error?: boolean;
	loading?: boolean;
	className?: string;
	sx?: SxProps<Theme>;
	hideFilesRejected?: boolean;
	helperText?: React.ReactNode;
	placeholder?: React.ReactNode;
	value?: FileUploadType | FilesUploadType;
	onDelete?: () => void;
	onUpload?: () => void;
	onRemove?: (file: File | string) => void;
	slotProps?: {
		wrapper?: React.ComponentProps<typeof UploadWrapper>;
	};
};
