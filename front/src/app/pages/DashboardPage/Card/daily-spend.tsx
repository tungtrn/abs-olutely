import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

type DailySpendProps = {
	difference: number;
	positive: boolean;
	sx: any;
	value: string;
};

export const DailySpend = (props: DailySpendProps) => {
	const { difference, positive = false, sx, value } = props;

	return (
		<Card sx={sx} style={{ backgroundColor: "#FAD85D", borderRadius: "20px" }}>
			<CardContent>
				<Stack
					alignItems="flex-start"
					direction="row"
					justifyContent="space-between"
					spacing={3}
				>
					<Stack spacing={1}>
						<Typography color="text.secondary" variant="overline">
							<b>Daily Spending</b>
						</Typography>
						<Typography variant="h4">{value}</Typography>
					</Stack>
				</Stack>
				{difference && (
					<Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
						<Stack alignItems="center" direction="row" spacing={0.5}>
							{positive ? (
								<ArrowUpwardIcon sx={{ color: "green" }} />
							) : (
								<ArrowDownwardIcon sx={{ color: "red" }} />
							)}
							<Typography color={positive ? "green" : "red"} variant="body2">
								{difference}%
							</Typography>
						</Stack>
						<Typography color="text.secondary" variant="caption">
							Since yesterday
						</Typography>
					</Stack>
				)}
			</CardContent>
		</Card>
	);
};
