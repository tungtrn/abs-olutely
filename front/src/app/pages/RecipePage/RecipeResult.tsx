import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    MenuItem,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import DropDown from '../../components/DropDown';
import PrimaryButton from '../../components/PrimaryButton';
import theme from '../../theme/theme';
import { handlePost } from '../APIRequest';
import { Recipe, Steps } from './Question';

const styles = {
	content: {
		position: "relative",
		// padding: 24,
		margin: "-5% 23% 0",
		backgroundColor: "#fff",
		borderRadius: 4,
		boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
		display: "flex",
		width: "50%",
	},
};

type IngredientType = {
	name: string;
	amount: string;
	calories: number;
}

export function RecipeCard(recipe: any) {
	const name = recipe.recipe.dish_name;
	const imageUrl = recipe.recipe.image_url;
	const ingredients : IngredientType[] = recipe.recipe.ingredients;

	return (
		<Card
			elevation={0}
			// className={styles.root}
			sx={{ backgroundColor: "transparent" }}
		>
			<CardMedia
				//   classes={mediaStyles}
				component="img"
				height={300}
				width={320}
				image={imageUrl}
				sx={{ objectFit: "contain", borderRadius: "20px", marginTop: "10%" }}
			/>
			<CardContent
				// className={cx(shadowStyles.root, styles.content)}
				sx={styles.content}
			>
				<Grid
					container
					direction="row"
					justifyContent="center"
					sx={{ width: "100%", display: "flex", flexGrow: 1 }}
				>
					<Grid item xs={12}>
						<Typography variant="h5">{name}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Grid
							container
							direction="row"
							justifyContent="space-between"
							spacing={5}
							rowSpacing={5}
							columnSpacing={5}
						>
							<Grid item xs={3}>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										flexDirection: "column",
									}}
								>
									<Typography variant="h6">Time</Typography>
									<Typography variant="h6">30 min</Typography>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										flexDirection: "column",
									}}
								>
									<Typography variant="h6">Time</Typography>
									<Typography variant="h6">30 min</Typography>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										flexDirection: "column",
									}}
								>
									<Typography variant="h6">Time</Typography>
									<Typography variant="h6">30 min</Typography>
								</Box>
							</Grid>
							<Grid item xs={3}>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										flexDirection: "column",
									}}
								>
									<Typography variant="h6">Time</Typography>
									<Typography variant="h6">30 min</Typography>
								</Box>
							</Grid>
						</Grid>
					</Grid>
					<Divider
						sx={{
							width: "100%",
							marginTop: "1.5rem",
							borderRightWidth: "thick",
							borderBottomWidth: "4px",
							borderRadius: "20px",
							backgroundColor: theme.palette.primary.main,
						}}
					/>
					<Grid item xs={12}>
						<Box
							sx={{
								display: "flex",
								// alignItems: "center",
								flexDirection: "column",
								width: "100%",
							}}
						>
							{ingredients.map((item) => {
								return (
									<Box sx={{ marginTop: "1rem" }}>
										<Box sx={{ display: "flex", flexDirection: "row" }}>
											<Box sx={{ width: "50%" }}>
												<Typography variant="h5">{item.name}</Typography>
											</Box>
											<Box
												sx={{
													width: "50%",
													justifyContent: "flex-end",
													display: "flex",
												}}
											>
												<Typography
													variant="h6"
													sx={{ color: theme.palette.primary.main }}
												>
													{item.calories} calories
												</Typography>
											</Box>
										</Box>
										<Typography variant="body1">{item.amount}</Typography>
									</Box>
								);
							})}
						</Box>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export function RecipeSteps(recipe: any) {
	const steps : string[] = recipe.recipe.recipes;
	const shoppingList : string[] = recipe.recipe.shopping_list;

	return (
		<Box
			sx={{
				display: "flex",
				height: "90%",
				weight: "100%",
				justifyContent: "flex-start",
				marginLeft: "10%",
				marginRight: "10%",
				marginTop: "7%",
				borderRadius: "20px",
				// backgroundColor: theme.palette.primary.main,
				backgroundColor: theme.palette.secondary.main,
				flexDirection: "column",
				paddingTop: "2rem",
				overflow: "auto"
			}}
		>
			<Typography variant="h2" sx={{ textAlign: "center", color: "black" }}>
				How to cook
			</Typography>
			{steps.map((item, index) => {
				return (
					<Box>
						<Typography
							variant="h4"
							sx={{
								marginTop: "1rem",
								alignItem: "flex-start",
								paddingLeft: "4rem",
								paddingRight: "2rem",
								color: "black",
							}}
						>
							{item}
						</Typography>
					</Box>
				);
			})}
			<Divider
				sx={{
					width: "100%",
					marginTop: "1.5rem",
					borderRightWidth: "thick",
					borderBottomWidth: "4px",
					borderRadius: "20px",
					backgroundColor: theme.palette.primary.main,
				}}
			/>
			<Typography
				variant="h2"
				sx={{ textAlign: "center", color: "black", marginTop: "2rem" }}
			>
				What to buy?
			</Typography>
			<Box
				sx={{
					width: "50%",
					justifyContent: "center",
					marginLeft: "auto",
					marginRight: "auto",
				}}
			>
				{shoppingList.map((item) => {
					return (
						// Display name of the ingredient and the amount on same line
						<Box sx={{ marginTop: "1rem" }}>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Box sx={{ width: "50%" }}>
									<Typography variant="h4" sx={{ color: "black" }}>
										{/* {item.name} */}
										{item}
									</Typography>
								</Box>
							</Box>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}

// props is date, and it is optional
type RecipeProps = {
	date?: string;
};

function RecipeResult(props: RecipeProps) {
	const [open, setOpen] = useState(false);
	const [mealToSave, setMealToSave] = useState("");
	const [mealDate, setMealDate] = useState("");

	const location = useLocation();
	let recipe: any;

	if (props.date) {
		// make request
		console.log("test")
	} else {
		recipe = location.state;
	}

	console.log(recipe);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (value: string) => {
		setMealToSave(value);
	};

	const handleSave = async () => {
		const response = await handlePost("api/v1/dish/calendar", {
			date: mealDate,
			meal: mealToSave,
			dish: recipe
		});

		if (response.status_code === 200) {
			console.log("Success");
		} else {
			console.log("Error");
		}
	}

	const RecipeDialog = () => (
		<Dialog open={open} onClose={handleClose} sx={{ borderRadius: "20px" }}>
			<DialogTitle>
				<Typography variant="h3">Save Meal</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<Typography variant="h5">
						Select the day and meal you want to save this meal to.
					</Typography>
				</DialogContentText>
				<FormControl sx={{ m: 1, minWidth: 120, mt: "2rem", width: "100%" }}>
					<TextField
						id="date"
						// label="Day"
						type="date"
						value={mealDate}
						onChange={(e) => setMealDate(e.target.value)}
						// defaultValue="2021-05-24"
						sx={{
							borderRadius: "20px",
							backgroundColor: "#F4E9CD",
							"& .MuiOutlinedInput-root": {
								borderRadius: "20px",
								backgroundColor: "#F4E9CD",
								border: "none",
							},
							"& .MuiOutlinedInput-input": {
								padding: "1rem",
								color: theme.palette.primary.main,
								fontWeight: 800,
							},
							"& .MuiOutlinedInput-notchedOutline": {
								border: "none",
							},
							// set color of placeholder text
							"& .MuiInputBase-input::placeholder": {
								color: theme.palette.primary.main,
								opacity: 0.5,
								fontWeight: 800,
							},
						}}
						// InputLabelProps={{
						// 	shrink: true,
						// }}
					/>
				</FormControl>
				<FormControl sx={{ m: 1, minWidth: 120, mt: "2rem", width: "100%" }}>
					<DropDown
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={mealToSave}
						label="Meal"
						onChange={(event: SelectChangeEvent<unknown>) => {
							handleChange(event.target.value as unknown as string);
						}}
					>
						<MenuItem value={"breakfast"}>Breakfast</MenuItem>
						<MenuItem value={"brunch"}>Brunch</MenuItem>
						<MenuItem value={"lunch"}>Lunch</MenuItem>
						<MenuItem value={"dinner"}>Dinner</MenuItem>
					</DropDown>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSave}>Save</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<Grid container direction="row" sx={{ width: "100%" }}>
			<p>{location.state.message}</p>
			<Grid item xs={12} md={6} lg={6}>
				<RecipeCard recipe={recipe} />
			</Grid>

			<Grid item xs={12} md={6} lg={6}>
				<RecipeSteps recipe={recipe} />
			</Grid>
			{/* Align 2 button in the center, 1 button to get another recipe, 1 button to save recipe that opens a dialog */}
			<Grid item xs={12} md={12} lg={12}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						marginTop: "3rem",
						marginBottom: "2rem",
					}}
				>
					<PrimaryButton
						variant="contained"
						style={{
							marginRight: "1rem",
							padding: ".5rem",
							paddingLeft: "1rem",
							paddingRight: "1rem",
						}}
					>
						<Typography variant="h5">Get Another Recipe</Typography>
					</PrimaryButton>
					<PrimaryButton
						variant="contained"
						style={{
							padding: ".5rem",
							paddingLeft: "1rem",
							paddingRight: "1rem",
						}}
						onClick={handleClickOpen}
					>
						<Typography variant="h5">Save Recipe</Typography>
					</PrimaryButton>
					<RecipeDialog />
				</Box>
			</Grid>
		</Grid>
	);
}

export default RecipeResult;
