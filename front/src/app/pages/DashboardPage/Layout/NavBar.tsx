import AppBar from "@mui/material/AppBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
// import { imageResources } from "../../images/images";
import TaskIcon from "@mui/icons-material/Task";
import HomeIcon from "@mui/icons-material/Home";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import theme from "../../../theme/theme";
function NavBar() {
	const navigate = useNavigate();
	const location = useLocation();

	const isInterviewPage = location.pathname === "/home/interview-session";
	const backgroundColor = isInterviewPage ? "#A4AEA4" : "#303830";
	return (
		<AppBar
			position="static"
			sx={{
				height: "100%",
				borderRadius: "24px",
				backgroundColor: "#F4E9CD",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
			}}
		>
			{/* <Container
                sx={{
                    padding: { xs: "0 0 0 16px" },
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <img src={imageResources.logo} alt="" width={"90px"} />
                
            </Container> */}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					flexGrow: "1",
				}}
				paddingTop={3}
				paddingBottom={3}
			>
				<Box>
					<Container
						sx={{
							padding: { xs: "0" },
							display: "flex",
							justifyContent: "center",
							marginBottom: "24px",
						}}
					>
						<div onClick={() => navigate("/home/dashboard")}>
							<HomeIcon
								fontSize="large"
								sx={{ color: theme.palette.primary.main }}
							/>
						</div>
					</Container>
					<Container
						sx={{
							padding: { xs: "0" },
							display: "flex",
							justifyContent: "center",
							marginBottom: "24px",
						}}
					>
						<div onClick={() => navigate("/home/recipe")}>
							<LocalDiningIcon
								fontSize="large"
								sx={{ color: theme.palette.primary.main }}
							/>
						</div>
					</Container>
				</Box>
				<Container
					sx={{
						padding: { xs: "0" },
						display: "flex",
						justifyContent: "center",
					}}
				>
					<LogoutOutlinedIcon
						fontSize="large"
						sx={{ color: theme.palette.primary.main }}
					/>
				</Container>
			</Box>
		</AppBar>
	);
}
export default NavBar;
