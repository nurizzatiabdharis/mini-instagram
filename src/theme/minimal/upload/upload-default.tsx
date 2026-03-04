import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import { mergeClasses } from "minimal-shared/utils";
import { useDropzone } from "react-dropzone";
import { Iconify } from "../iconify";
import { uploadClasses } from "./classes";
import { SingleFilePreview } from "./single-file-preview";
import {
	DeleteButton,
	PlaceholderContainer,
	UploadArea,
	UploadWrapper,
} from "./styles";
import type { UploadProps } from "./types";

// ----------------------------------------------------------------------

export function Upload({
	sx,
	value,
	error,
	disabled,
	onDelete,
	className,
	helperText,
	slotProps,
	loading = false,
	multiple = false,
	placeholder,
	...dropzoneOptions
}: UploadProps) {
	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			multiple,
			disabled,
			...dropzoneOptions,
		});

	const isSingleFileSelected = !multiple && !!value && !Array.isArray(value);

	const hasError = isDragReject || !!error;

	const renderPlaceholder = () => (
		<PlaceholderContainer className={uploadClasses.placeholder.root}>
			<Iconify
				width={160}
				icon="solar:gallery-circle-outline"
				sx={{ color: "text.disabled" }}
			/>
			<Typography variant="h6" sx={{ mt: 2 }} color="text.disabled">
				{placeholder || "Select"}
			</Typography>
		</PlaceholderContainer>
	);

	const renderSingleFileLoading = () =>
		loading &&
		!multiple && (
			<CircularProgress
				size={26}
				color="primary"
				sx={{ zIndex: 9, right: 16, bottom: 16, position: "absolute" }}
			/>
		);

	const renderSingleFilePreview = () =>
		isSingleFileSelected && <SingleFilePreview file={value} />;

	return (
		<UploadWrapper {...slotProps?.wrapper} className={uploadClasses.wrapper}>
			<UploadArea
				{...getRootProps()}
				className={mergeClasses([uploadClasses.default, className], {
					[uploadClasses.state.dragActive]: isDragActive,
					[uploadClasses.state.disabled]: disabled,
					[uploadClasses.state.error]: hasError,
				})}
				sx={sx}
			>
				<input {...getInputProps()} />
				{isSingleFileSelected ? renderSingleFilePreview() : renderPlaceholder()}
			</UploadArea>

			{isSingleFileSelected && (
				<DeleteButton size="small" onClick={onDelete}>
					<Iconify icon="mingcute:close-line" width={16} />
				</DeleteButton>
			)}

			{helperText && (
				<FormHelperText error={!!error}>{helperText}</FormHelperText>
			)}

			{renderSingleFileLoading()}
		</UploadWrapper>
	);
}
