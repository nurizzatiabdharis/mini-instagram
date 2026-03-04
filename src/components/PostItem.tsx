import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { capitalize } from "@mui/material/utils";
import RouterLink from "next/link";
import { Iconify } from "src/theme/minimal/iconify";
import { Image } from "src/theme/minimal/image";
import { Label } from "src/theme/minimal/label";
import type { Post } from "src/types/posts";

type Props = {
	item: Post;
};

export default function PostItem({ item }: Props) {
	const renderTopInfo = () => (
		<Box
			sx={{
				px: 2,
				pb: 1,
				gap: 2,
				pt: 2.5,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
				<Avatar alt={item.author} color="primary">
					{item.author.charAt(0).toUpperCase()}
				</Avatar>
				<ListItemText
					primary={capitalize(item.author)}
					secondary={new Date(item.createdAt).toLocaleString()}
					slotProps={{
						secondary: {
							sx: {
								mt: 0.5,
								typography: "caption",
								color: "text.disabled",
							},
						},
					}}
				/>
			</Box>
			<Box
				sx={{
					rowGap: 1.5,
					columnGap: 2,
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					typography: "caption",
					color: "text.secondary",
				}}
			>
				<Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
					<Typography variant="body1" sx={{ color: "text.primary" }}>
						{item.caption}
					</Typography>
				</Box>
			</Box>
		</Box>
	);

	const renderImage = () => (
		<Box
			sx={{
				p: 1,
				position: "relative",
			}}
		>
			<Image
				alt={item.caption}
				src={item.imageUrl}
				ratio="1/1"
				sx={{ borderRadius: 1.5 }}
			/>
		</Box>
	);

	return (
		<Card
			sx={{
				mb: 2,
				borderRadius: 2,
			}}
		>
			<IconButton
				component={RouterLink}
				href={`/${item.id}/details`}
				sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
				size="small"
			>
				<Iconify icon="solar:eye-bold" sx={{ color: "text.disabled" }} />
			</IconButton>
			{renderTopInfo()}
			{renderImage()}
			<Label
				variant="filled"
				sx={{ right: 16, zIndex: 9, bottom: 16, position: "absolute" }}
			>
				<Iconify
					width={16}
					icon="solar:heart-bold"
					sx={{ flexShrink: 0, color: "error.main" }}
				/>
				{item.likes} likes
			</Label>
		</Card>
	);
}
