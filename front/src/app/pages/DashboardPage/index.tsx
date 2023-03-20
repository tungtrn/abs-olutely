import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Card, CardHeader, Grid, Typography } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import * as React from "react";

import theme from "../../theme/theme";
import { RecipeInformation } from "../RecipePage/Question";
import { RecipeCard, RecipeSteps } from "../RecipePage/RecipeResult";
import { CalsProgress } from "./Card/cal-goal-tracking";
import { ComponentDistribution } from "./Card/component-dist";
import { DailyCal } from "./Card/daily-cal";
import { DailySpend } from "./Card/daily-spend";
import { MonthlyCal } from "./Card/monthly-cal";
import { ShoppingList } from "./Card/shopping-list";
import { SpendProgress } from "./Card/spend-goal-tracking";
import { MealProps, TodayMeal } from "./Card/TodayMeals";
import { handleGet } from "../APIRequest";

export interface DayRecipeProps {
	breakfast: MealProps;
	brunch: MealProps;
	lunch: MealProps;
	dinner: MealProps;
}

const Page = () => {
	const [open, setOpen] = useState(false);
	const [fullWidth, setFullWidth] = useState(true);
	const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("lg");
	const [emptyData, setEmptyData] = useState(false);

	const todayDay = dayjs();
	const [date, setDate] = useState<Dayjs | null>(todayDay);

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

	const [searchedMeal, setSearchedMeal] = useState<DayRecipeProps | null>({
		breakfast: baseMeal,
		brunch: baseMeal,
		lunch: baseMeal,
		dinner: baseMeal,
	});

	const [selectedMeal, setSelectedMeal] = useState<string>("");
	const meals = ["breakfast", "brunch", "lunch", "dinner"];

	const handleClose = () => {
		setSelectedMeal("");
		setOpen(false);
	};

	const handleChange = (value: Dayjs | null) => {
		//convert date to string but only date
		// console.log(date);
		if (value) {
			console.log(value.format("YYYY-MM-DD"));
			setDate(value);
			handleClickOpen(value);
		}
	};

	const handleClickOpen = async (date?: Dayjs) => {
		setOpen(true);
		console.log(date);

		const requestDate = date ? date : todayDay;

		const response = await handleGet(
			`api/v1/dish/calendar?from=${requestDate?.format(
				"YYYY-MM-DD",
			)}&to=${requestDate?.format("YYYY-MM-DD")}`,
			true,
		);

		console.log(response);

		if (response.status_code === 200) {
			console.log(response.data.length);	
			if (response.data.length == 0) {
				setSearchedMeal(null);
				setEmptyData(true);
				console.log(emptyData);
			} else {
				setSearchedMeal(response.data[0].dish);
				setEmptyData(false);
			}
		}

		console.log(emptyData)
	};

	const recipeDialog = (
		<Dialog
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			open={open}
			onClose={handleClose}
			// scroll="paper"
		>
			<DialogTitle variant="h3">
				Meals for {date?.format("YYYY-MM-DD")}
			</DialogTitle>
			<DialogContent dividers>
				<Box display="flex" flexDirection="row" alignItems="center">
					<Box
						flexDirection={"column"}
						display={"flex"}
						alignItems={"flex-start"}
						sx={{
							width: "20%",
							// boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.14)",
							borderRadius: "20px",
							border: "1px solid " + theme.palette.primary.main,
							padding: "1rem",
							backgroundColor: theme.palette.success.main,
						}}
					>
						{meals.map((meal) => {
							return (
								<Button
									style={{
										// width: "35%",
										justifyContent: "space-between",
										display: "flex",
										backgroundColor:
											selectedMeal === meal
												? theme.palette.primary.main
												: theme.palette.success.main,
										color:
											selectedMeal === meal
												? theme.palette.success.main
												: theme.palette.primary.main,
										borderRadius: "20px",
										marginTop: "1rem",
									}}
									fullWidth
									disabled={emptyData}
									onClick={() => setSelectedMeal(meal)}
									endIcon={<ChevronRight style={{ marginLeft: "2rem" }} />}
								>
									<Typography
										variant="h4"
										sx={{
											color:
												selectedMeal === meal
													? theme.palette.success.main
													: theme.palette.primary.main,
										}}
									>
										{meal}
									</Typography>
								</Button>
							);
						})}
					</Box>
					<Box
						sx={{
							maxHeight: "80%",
							overflow: "auto",
							marginLeft: "2rem",
						}}
					>
						{selectedMeal ? (
							<Grid
								container
								direction="row"
								sx={{
									width: "100%",
									borderRadius: "20px",
									backgroundColor: theme.palette.success.main,
									border: "1px solid " + theme.palette.primary.main,
								}}
							>
								<Grid item xs={12} md={6} lg={6}>
									<RecipeCard recipe={searchedMeal} />
								</Grid>

								<Grid item xs={12} md={6} lg={6}>
									<RecipeSteps recipe={searchedMeal} />
								</Grid>
							</Grid>
						) : (
							<Typography variant="h4">
								Select one of your saved meals
							</Typography>
						)}
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<Grid container spacing={3} flexDirection={"row"}>
			<Grid item xs={12} sm={12} lg={12}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} lg={3}>
						<DailyCal
							difference={12}
							positive
							sx={{ height: "100%" }}
							value="2400"
						/>
					</Grid>
					<Grid item xs={12} sm={6} lg={3}>
						<DailySpend
							difference={20}
							positive={false}
							sx={{ height: "100%" }}
							value="$150"
						/>
					</Grid>
					<Grid item xs={12} sm={6} lg={3}>
						<CalsProgress
							sx={{ height: "100%", borderRadius: "20px" }}
							value={100 * (2500 / 3200)}
						/>
					</Grid>
					<Grid item xs={12} sm={6} lg={3}>
						<SpendProgress
							sx={{ height: "100%", borderRadius: "20px" }}
							value={100 * (280 / 400)}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={12} lg={12}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} lg={8}>
						<MonthlyCal
							chartSeries={[
								{
									name: "This week",
									data: [1800, 1600, 1400, 1700, 1900, 1800, 2000],
								},
							]}
							sx={{ height: "100%", borderRadius: "20px" }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} lg={4}>
						<ComponentDistribution
							chartSeries={[63, 15, 22, 30]}
							labels={["Micro", "Macro", "Carb", "Protein"]}
							sx={{ height: "100%", borderRadius: "20px" }}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={12} lg={12}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} lg={3.5}>
						<TodayMeal onClick={handleClickOpen} />
					</Grid>
					<Grid item xs={12} sm={12} lg={3.5}>
						<Card
							sx={{
								height: "93%",
								paddingBottom: "2rem",
							}}
							style={{
								backgroundColor: theme.palette.primary.main,
								borderRadius: "20px",
							}}
						>
							<CardHeader title="Calendar" />
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar
									value={date}
									onChange={handleChange}
									sx={{
										backgroundColor: "white",
										borderRadius: "20px",
										height: "90%",
										// paddingTop: "2rem",
									}}
								/>
								{recipeDialog}
							</LocalizationProvider>
						</Card>
					</Grid>
					<Grid item xs={12} sm={12} lg={5}>
						<ShoppingList
							orders={[
								{
									id: "abcd",
									spend: 30.5,
									store: {
										name: "Amazon Fresh",
									},
									status: "Shipping",
								},
								{
									id: "xyz",
									spend: 25.1,
									store: {
										name: "Old Nelson",
									},
									status: "Delivered",
								},
								{
									id: "ghi",
									spend: 10.99,
									store: {
										name: "Amazon",
									},
									status: "Refunded",
								},
								{
									id: "ghi",
									spend: 10.99,
									store: {
										name: "Amazon",
									},
									status: "Refunded",
								},
							]}
							sx={{ height: "100%" }}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Page;
