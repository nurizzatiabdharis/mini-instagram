import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { capitalize } from "@mui/material/utils";

type Props = {
	name: string;
	message: string;
	postedAt: string;
};

export default function CommentItem({ name, message, postedAt }: Props) {
	return (
		<Box
			sx={{
				gap: 2,
				display: "flex",
				position: "relative",
			}}
		>
			<Avatar alt={name} color="primary">
				{name.charAt(0).toUpperCase()}
			</Avatar>
			<Box
				sx={{
					pb: 1,
					display: "flex",
					flex: "1 1 auto",
					flexDirection: "column",
				}}
			>
				<Typography variant="subtitle2" sx={{ mb: 0.5 }}>
					{capitalize(name)}
				</Typography>
				<Typography variant="caption" sx={{ color: "text.disabled" }}>
					{new Date(postedAt).toLocaleString()}
				</Typography>
				<Typography variant="body2" sx={{ mt: 1 }}>
					{message}
				</Typography>
			</Box>
		</Box>
	);
}
