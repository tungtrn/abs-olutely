import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../stores/store";
import { Outlet, useLocation } from "react-router-dom";
// import NavBar from "../../components/NavBar/NavBar";
import { Grid } from "@mui/material";
import theme from "../../theme/theme";
import { useEffect, useState } from "react";
import NavBar from "../DashboardPage/Layout/NavBar";

const Home = () => {
	const navBarWidth = "100px";
	// const pathname = usePathname();
	const [openNav, setOpenNav] = useState(true);

	const location = useLocation();

	useEffect(() => {
		if (openNav) {
			setOpenNav(false);
		}
	}, [openNav]);

	// const backgroundColor = (isInterviewSession || isInterviewPrompt) ? "#A4AEA4" : "white";
	return (
		<Grid
			container
			height={"100vh"}
			padding={3}
			position="relative"
			bgcolor={theme.palette.background.default}
		>
			<Grid item height={"100%"} padding={0} width={navBarWidth} xs={1}>
				{/* <NavBar /> */}
				<NavBar />
			</Grid>
			<Grid
				item
				xs={11}
				height={"99%"}
				padding={0}
				paddingLeft={7}
				flexGrow={1}
				maxWidth={`calc(100% - ${navBarWidth})`}
				sx={{
					overflow: "auto",
				}}
			>
				<Outlet />
			</Grid>
		</Grid>
	);
};
export default Home;
