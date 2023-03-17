import { ChevronRight } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";

import theme from "../../theme/theme";
import { RecipeInformation } from "../RecipePage/Question";
import { RecipeCard, RecipeSteps } from "../RecipePage/RecipeResult";

interface DayRecipeProps {
	breakfast: RecipeInformation[];
	brunch: RecipeInformation[];
	lunch: RecipeInformation[];
	dinner: RecipeInformation[];
}

export default function DashBoard() {
	const [open, setOpen] = React.useState(false);
	const [fullWidth, setFullWidth] = React.useState(true);
	const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
	const [date, setDate] = React.useState<Dayjs | null>(dayjs());

	const [mealOfDay, setMealOfDay] = React.useState<DayRecipeProps>({
		breakfast: [],
		brunch: [],
		lunch: [],
		dinner: [],
	});

	const [selectedMeal, setSelectedMeal] = React.useState<string>("");
	const meals = ["breakfast", "brunch", "lunch", "dinner"];

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setSelectedMeal("");
		setOpen(false);
	};

	const handleChange = (value: Dayjs | null) => {
		//convert date to string but only date
		// console.log(date);
		if (value) {
			// console.log(value?.toString());
			// const utcDate = new Date(value.toString());
			// const month = utcDate.getUTCMonth() + 1;
			// const day = utcDate.getUTCDate();
			// const year = utcDate.getUTCFullYear();
			// const formattedDate = `${month.toString().padStart(2, "0")}/${day
			// 	.toString()
			// 	.padStart(2, "0")}/${year}`;

			// console.log(formattedDate); // Output: 03/25/2023
			setDate(value);
			console.log(value.format("MM/DD/YYYY"));
			handleClickOpen();
		}
	};

	const recipeDialog = (
		<Dialog
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			open={open}
			onClose={handleClose}
			// scroll="paper"
		>
			<DialogTitle variant="h3">Meals for {date?.format("MM/DD/YYYY")}</DialogTitle>
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
									<RecipeCard />
								</Grid>

								<Grid item xs={12} md={6} lg={6}>
									<RecipeSteps />
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
		<Box sx={{ width: "20%" }}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar
					value={date}
					onChange={handleChange}
					sx={{ backgroundColor: "white", borderRadius: "20px" }}
				/>
				{recipeDialog}
			</LocalizationProvider>
		</Box>
	);
}
