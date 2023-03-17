import { FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import { useEffect } from "react";
import theme from "../theme/theme";

function DropDown(props: SelectProps) {
	useEffect(() => {
		console.log(props.value);
	}, [props.value]);
	
	return (
		<FormControl sx={{ width: "100%" }}>
			{/* If select is clicked, undisplay the label */}
			<InputLabel
				sx={{
					color: theme.palette.primary.main,
					display: "block",
					fontWeight: 800,
					opacity: 0.5,
					"&.Mui-focused": {
						display: "none",
					},
				}}
			>
				Answer
			</InputLabel>
			<Select
				variant="outlined"
				sx={{
					backgroundColor: theme.palette.success.main,
					color: theme.palette.primary.main,
					fontWeight: 800,
					borderRadius: "20px",
					boxShadow: "none",
					".MuiOutlinedInput-notchedOutline": { border: 0 },
					width: "100%",
				}}
				fullWidth
				{...props}
			/>
		</FormControl>
	);
}

export default DropDown;
