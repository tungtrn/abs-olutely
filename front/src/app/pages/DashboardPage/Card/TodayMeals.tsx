import {
	Box,
	Button,
	Card,
	CardHeader,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SimpleBar from "simplebar-react";
import theme from "../../../theme/theme";

type TodayMealProps = {
    onClick: () => void;
};

export const TodayMeal = (props: TodayMealProps) => {
	const meals = ["Breakfast", "Brunch", "Lunch", "Dinner"];

	return (
		<Card
			sx={{
				height: "100%",
			}}
			style={{ backgroundColor: "#FFE27B", borderRadius: "20px" }}
		>
			<CardHeader title="Today's Meal" />
			<Box sx={{ paddingLeft: "2rem", paddingRight: "1.5rem", marginBottom: "1rem" }}>
				{meals.map((meal) => (
					<Grid container>
						<Grid item xs={12} sm={6} md={12}>
							<Typography variant="h6" sx={{ color: theme.palette.primary.main }}>{meal}</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={12}>
							<Divider />
						</Grid>
						<Grid item xs={12} sm={6} md={8}>
							<Typography variant="h6">Caesar Sald</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Button variant="text" color="primary" size="small" onClick={props.onClick}>
								<Typography variant="body1">View Recipe</Typography>
							</Button>
						</Grid>
					</Grid>
				))}
			</Box>
		</Card>
	);
};
