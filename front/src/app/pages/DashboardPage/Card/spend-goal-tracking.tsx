import PropTypes from "prop-types";
import {
	Box,
	Card,
	CardContent,
	LinearProgress,
	Stack,
	Typography,
} from "@mui/material";

type SpendingProgressProps = {
	value: number;
	sx: any;
};

export const SpendProgress = (props: SpendingProgressProps) => {
	const { value, sx } = props;

	return (
		<Card sx={sx} style={{ backgroundColor: "#A4DACA" }}>
			<CardContent>
				<Stack
					alignItems="flex-start"
					direction="row"
					justifyContent="space-between"
					spacing={3}
				>
					<Stack spacing={1}>
						<Typography color="text.secondary" gutterBottom variant="overline">
							<b>Monthly Spending ($)</b>
						</Typography>
						<Typography variant="h4">{value}%</Typography>
					</Stack>
				</Stack>
				<Box sx={{ mt: 3 }}>
					<LinearProgress
						value={value}
						variant="determinate"
						sx={{
							minHeight: "1vh",
							borderRadius: "20px",
						}}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};
