import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../stores/store";
import { Outlet, useLocation } from "react-router-dom";
// import NavBar from "../../components/NavBar/NavBar";
import { Grid } from "@mui/material";
import theme from "../../theme/theme";

const mapStateToProps = (state: RootState) => ({
    userName: state.auth.user?.name || "",
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Home = (props: PropsFromRedux) => {
    const navBarWidth = "100px";

    const location = useLocation();

    // const backgroundColor = (isInterviewSession || isInterviewPrompt) ? "#A4AEA4" : "white";
    return (
        <Grid container height={"100vh"} padding={3} position="relative" bgcolor={theme.palette.background.default}>
            <Grid item height={"100%"} padding={0} width={navBarWidth} xs={1}>
                {/* <NavBar /> */}
            </Grid>
            <Grid
                item
                xs={11}
                height={"100%"}
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
export default connector(Home);