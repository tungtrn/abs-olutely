import { Button, ButtonProps } from "@mui/material";
import theme from "../theme/theme";

function PrimaryButton(props: ButtonProps) {
	return (
		<Button
			variant="contained"
			sx={{
				borderRadius: "20px",
				backgroundColor: "#F4E9CD",
				color: theme.palette.primary.main,
                textTransform: "none",
                "&:hover": {
                    "*": {
                        textDecorationColor: "white",
                        color: "white"
                    }
                }
			}}
			{...props}
		/>
	);
}

export default PrimaryButton;
