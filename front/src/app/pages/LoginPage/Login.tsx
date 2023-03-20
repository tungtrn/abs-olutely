import { Divider, Grid, Hidden, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
	getAdditionalUserInfo,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";

import { auth } from "../../firebase-config";
import { useAppDispatch } from "../../hooks/hooks";
import { setUser } from "../../reducer/authSlice";
import theme from "../../theme/theme";
import { handlePost } from "../APIRequest";

type SignInData = {
	email: string;
	password: string;
};

function Login() {
	const navigate = useNavigate();
  const dispatch = useAppDispatch();

	const [signInData, setSignInData] = React.useState<SignInData>({
		email: "",
		password: "",
	});

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSignInData({
			...signInData,
			email: event.target.value,
		});
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSignInData({
			...signInData,
			password: event.target.value,
		});
	};

  const handleSignIn = async () => {
    const response = await handlePost("api/v1/auth/login", signInData, false);

    console.log(response);

    if (response.status_code === 200) {
      dispatch(setUser(response.data.token));

      navigate("/home/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
			// style={{ height: '100vh' }}
			textAlign="center"
			sx={{ backgroundColor: "#F4E9CD", height: "100vh" }}
		>
			<Box sx={{ flexDirection: "column" }}>
				<Typography
					variant="h1"
					component="h2"
					gutterBottom
					sx={{ fontSize: "4rem" }}
				>
					Welcome to Abs-olutely!
				</Typography>
				<Typography
					variant="h4"
					component="h2"
					gutterBottom
					sx={{ fontSize: "2.5rem" }}
				>
					Enjoy delicous meal, with AI-generated recipes curated for your plan,
					diet, and preferences.
				</Typography>
			</Box>
			<Grid
				container
				direction={"row"}
				justifyContent="center"
				alignItems="center"
				style={{ marginTop: "10%" }}
			>
				<Grid item xs={12} sm={12} md={6} lg={6}>
					<Box>
						<Typography
							variant="h4"
							component="h2"
							gutterBottom
							sx={{ fontSize: "2.5rem" }}
						>
							Let's authenticate first!
						</Typography>
					</Box>
				</Grid>
				<Hidden mdDown>
					<Divider
						orientation="vertical"
						flexItem
						sx={{
							borderRightWidth: "thick",
							borderRadius: "20px",
							backgroundColor: theme.palette.primary.main,
							marginRight: "4rem",
						}}
						color="primary"
					/>
				</Hidden>
				<Grid item xs={12} sm={12} md={6} lg={5} sx={{ paddingLeft: "2rem" }}>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						onChange={handleEmailChange}
						sx={{
							borderRadius: "20px",
							"& .MuiOutlinedInput-root": {
								borderRadius: "20px",
							},
							"& .MuiOutlinedInput-input": {
								padding: "1rem",
								color: theme.palette.primary.main,
								fontWeight: 800,
							},
							// set color of placeholder text
							"& .MuiInputBase-input::placeholder": {
								color: theme.palette.primary.main,
								opacity: 0.5,
								fontWeight: 800,
							},
						}}
					/>
					<TextField
						label="Password"
						variant="outlined"
						fullWidth
						type="password"
						onChange={handlePasswordChange}
						sx={{
							marginTop: "2rem",
							borderRadius: "20px",
							"& .MuiOutlinedInput-root": {
								borderRadius: "20px",
							},
							"& .MuiOutlinedInput-input": {
								padding: "1rem",
								color: theme.palette.primary.main,
								fontWeight: 800,
							},
							// set color of placeholder text
							"& .MuiInputBase-input::placeholder": {
								color: theme.palette.primary.main,
								opacity: 0.5,
								fontWeight: 800,
							},
						}}
					/>
					<PrimaryButton
						style={{
							marginTop: "2rem",
							border: "1px solid" + theme.palette.primary.main,
						}}
            onClick={handleSignIn}
					>
						<Typography variant="h6">Sign In</Typography>
					</PrimaryButton>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Login;
