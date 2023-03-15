import { TextField, TextFieldProps } from "@mui/material";
import theme from "../theme/theme";

export function CustomizedTextField(props: TextFieldProps) {
	return (
		<TextField
			id="outlined-basic"
			variant="outlined"
			placeholder="Answer"
			fullWidth
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
			{...props}
		/>
	);
}
