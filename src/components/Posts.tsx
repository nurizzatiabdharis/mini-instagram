import Avatar from "@mui/material/Avatar";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import { Iconify } from "src/minimal/iconify";
import { Image } from "src/minimal/image";
import { Label } from "src/minimal/label";

// ----------------------------------------------------------------------

type Props = BoxProps & {
	title?: string;
	subheader?: string;
	list: {
		id: string;
		author: string;
		imageUrl: string;
		caption: string;
		likes: number;
		createdAt: string;
	}[];
};

export function Posts({ list, sx, ...other }: Props) {
	return (
		<Box sx={[{ py: 2 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
			{list.map((item) => (
				<Item key={item.id} item={item} />
			))}
		</Box>
	);
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
	item: Props["list"][number];
};

function Item({ item, sx, ...other }: ItemProps) {
	return (
		<Box
			sx={[
				{
					width: "50vh",
					mb: 2,
					borderRadius: 2,
					position: "relative",
					bgcolor: "background.neutral",
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...other}
		>
			<IconButton
				sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
				size="small"
			>
				<Iconify icon="eva:more-vertical-fill" />
			</IconButton>

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
					<Avatar alt={item.author} src={item.imageUrl} />
					<ListItemText
						primary={item.author}
						secondary={item.createdAt}
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
						<Iconify
							width={16}
							icon="solar:users-group-rounded-bold"
							sx={{ flexShrink: 0 }}
						/>
						{item.likes} likes
					</Box>
				</Box>
			</Box>

			<Label
				variant="filled"
				sx={{ right: 16, zIndex: 9, bottom: 16, position: "absolute" }}
			>
				{item.caption}
			</Label>

			<Box sx={{ p: 1, position: "relative" }}>
				<Image
					alt={item.caption}
					src={item.imageUrl}
					ratio="1/1"
					sx={{ borderRadius: 1.5 }}
				/>
			</Box>
		</Box>
	);
}
