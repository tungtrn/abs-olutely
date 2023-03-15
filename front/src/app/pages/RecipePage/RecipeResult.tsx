import { Favorite, LocationOn } from "@mui/icons-material";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import theme from "../../theme/theme";
import { Recipe, Steps } from "./Question";

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

function RecipeCard() {
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
				image={
					"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
				}
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
						<Typography variant="h5">Caesar Salad</Typography>
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
							{Recipe.map((item) => {
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

function RecipeSteps() {
	return (
		<Box
			sx={{
				display: "flex",
				height: "100%",
				weight: "100%",
				justifyContent: "flex-start",
				marginLeft: "10%",
				marginRight: "10%",
				marginTop: "7%",
				borderRadius: "20px",
				// backgroundColor: theme.palette.primary.main,
				backgroundColor: theme.palette.error.main,
				flexDirection: "column",
				paddingTop: "2rem",
			}}
		>
			<Typography variant="h2" sx={{ textAlign: "center" }}>
				How to cook
			</Typography>
			{Steps.map((item, index) => {
				return (
                    <Box>
					<Typography variant="h4" sx={{ marginTop: "1rem", alignItem: "flex-start", paddingLeft: "4rem", paddingRight: "2rem" }}>
						{index + 1}. {item}
					</Typography>
                    </Box>
				);
			})}
		</Box>
	);
}

function RecipeResult() {
	return (
		<Grid container direction="row" sx={{ width: "100%" }}>
			<Grid item xs={12} md={6} lg={6}>
				<RecipeCard />
			</Grid>

			<Grid item xs={12} md={6} lg={6}>
				<RecipeSteps />
			</Grid>
		</Grid>
	);
}

export default RecipeResult;
