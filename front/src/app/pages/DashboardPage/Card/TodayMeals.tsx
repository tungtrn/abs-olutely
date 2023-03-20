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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { DayRecipeProps } from "..";
import theme from "../../../theme/theme";
import { handleGet } from "../../APIRequest";

type TodayMealProps = {
	onClick: () => void;
};

export type MealProps = {
	dish_name: string;
	image_url: string;
	ingredients: string[];
	recipes: string[];
	shopping_list: string[];
};

export const TodayMeal = (props: TodayMealProps) => {
	const meals = ["breakfast", "brunch", "lunch", "dinner"];

	const baseMeal = {
		dish_name: "",
		image_url: "",
		ingredients: [],
		recipes: [],
		shopping_list: [],
	};

	const [mealOfDay, setMealOfDay] = useState<DayRecipeProps>({
		breakfast: baseMeal,
		brunch: baseMeal,
		lunch: baseMeal,
		dinner: baseMeal,
	});

	useEffect(() => {
		const today = dayjs();

		const requestMeal = async () => {
			const response = await handleGet(
				`api/v1/dish/calendar?from=${today.format(
					"YYYY-MM-DD",
				)}&to=${today.format("YYYY-MM-DD")}`,
				true,
			);

			if (response.status_code === 200) {
				response.data.map((day: any) => {
					console.log(day);

					if (day.meal === "breakfast") {
						setMealOfDay((prev) => ({
							...prev,
							breakfast: day.dish,
						}));
					} else if (day.meal === "brunch") {
						setMealOfDay((prev) => ({
							...prev,
							brunch: day.dish,
						}));
					} else if (day.meal === "lunch") {
						console.log("here");
						setMealOfDay((prev) => ({
							...prev,
							lunch: day.dish,
						}));
					} else if (day.meal === "dinner") {
						setMealOfDay((prev) => ({
							...prev,
							dinner: day.dish,
						}));
					}
				});
			}
		};

		requestMeal();
	}, []);

	useEffect(() => {
		console.log(mealOfDay);
	}, [mealOfDay]);

	return (
		<Card
			sx={{
				height: "100%",
			}}
			style={{ backgroundColor: "#FFE27B", borderRadius: "20px" }}
		>
			<CardHeader title="Today's Meal" />
			<Box
				sx={{
					paddingLeft: "2rem",
					paddingRight: "1.5rem",
					marginBottom: "1rem",
				}}
			>
				{meals.map((meal, index) => (
					<Grid container>
						<Grid item xs={12} sm={6} md={12} sx={{ marginTop: ".5rem" }}>
							<Typography
								variant="h6"
								sx={{ color: theme.palette.primary.main }}
							>
								{meal.charAt(0).toUpperCase() + meal.slice(1)}
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={12}>
							<Divider />
						</Grid>
						{/* {

						} */}
						{index === 0 &&
						mealOfDay["breakfast"] &&
						mealOfDay["breakfast"].dish_name !== "" ? (
							<>
								<Grid item xs={12} sm={6} md={8}>
									<Typography variant="h6">
										{mealOfDay["breakfast"].dish_name}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<Button
										variant="text"
										color="primary"
										size="small"
										onClick={props.onClick}
									>
										<Typography variant="body1">View Recipe</Typography>
									</Button>
								</Grid>
							</>
						) : index === 0 ? (
							<Grid item xs={12} sm={6} md={8}>
								<Typography variant="h6">No meal</Typography>
							</Grid>
						) : (
							""
						)}
						{index === 1 &&
						mealOfDay["brunch"] &&
						mealOfDay["brunch"].dish_name !== "" ? (
							<>
								<Grid item xs={12} sm={6} md={8}>
									<Typography variant="h6">
										{mealOfDay["brunch"].dish_name}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<Button
										variant="text"
										color="primary"
										size="small"
										onClick={props.onClick}
									>
										<Typography variant="body1">View Recipe</Typography>
									</Button>
								</Grid>
							</>
						) : index === 1 ? (
							<Grid item xs={12} sm={6} md={8}>
								<Typography variant="h6">No meal</Typography>
							</Grid>
						) : (
							""
						)}
						{index === 2 &&
						mealOfDay["lunch"] &&
						mealOfDay["lunch"].dish_name !== "" ? (
							<>
								<Grid item xs={12} sm={6} md={8}>
									<Typography variant="h6">
										{mealOfDay["lunch"].dish_name}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<Button
										variant="text"
										color="primary"
										size="small"
										onClick={props.onClick}
									>
										<Typography variant="body1">View Recipe</Typography>
									</Button>
								</Grid>
							</>
						) : index === 2 ? (
							<Grid item xs={12} sm={6} md={8}>
								<Typography variant="h6">No meal</Typography>
							</Grid>
						) : (
							""
						)}
						{index === 3 &&
						mealOfDay["dinner"] &&
						mealOfDay["dinner"].dish_name !== "" ? (
							<>
								<Grid item xs={12} sm={6} md={8}>
									<Typography variant="h6">
										{mealOfDay["dinner"].dish_name}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<Button
										variant="text"
										color="primary"
										size="small"
										onClick={props.onClick}
									>
										<Typography variant="body1">View Recipe</Typography>
									</Button>
								</Grid>
							</>
						) : index === 3 ? (
							<Grid item xs={12} sm={6} md={8}>
								<Typography variant="h6">No meal</Typography>
							</Grid>
						) : (
							""
						)}
						{/* <Grid item xs={12} sm={6} md={8}>
							<Typography variant="h6">Caesar Sald</Typography>
						</Grid> */}
					</Grid>
				))}
			</Box>
		</Card>
	);
};
