import { styled } from "@mui/material/styles";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import PrimaryButton from "../../components/PrimaryButton";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: 200,
	backgroundColor: "#F4E9CD",
	// marginRight: '2rem',
	// marginLeft: 0,
	border: "1px solid darkblue",
	// width: '100%',
	[theme.breakpoints.up("sm")]: {
		//   marginLeft: theme.spacing(3),
		width: "100%",
	},
}));

function Pantry() {
	const ingredients = [
		"Steak",
		"Egg",
		"New York Steak",
		"Boston Steak",
		"Vietnam Steak",
		"Cho nam",
		"meo nam",
		"heo nam",
		"asdas",
		"Asdasd",
		"ASdasd",
	];
	const [search, setSearch] = useState<string>("");
	// const [onFocus, setOnFocus] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSearchChange = (
		event: React.SyntheticEvent<Element, Event>,
		searchString: string,
	) => {
		setSearch(searchString);
		//     if (event.type === 'click') {
		//       console.log("Move to new page");
		//       navigate('/Livemarket', { state: searchString })
		//   }
	};

	return (
		<Box
			sx={{
				flexDirection: "column",
				marginTop: "10%",
				marginLeft: "10%",
				marginRight: "10%",
			}}
		>
			<Search>
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={ingredients}
					getOptionLabel={(option) => option}
					sx={{
						// border: "1px solid blue",
						// "& .MuiOutlinedInput-root": {
						//     // border: "1px solid yellow",
						//     borderRadius: "400",
						//     // padding: "0"
						// },
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
							border: "none",
							// borderRadius: "400",
						},
					}}
					renderInput={(params) => (
						<TextField placeholder={"Search for ingredients..."} {...params} />
					)}
					popupIcon={<SearchIcon />}
					forcePopupIcon={true}
					inputValue={search}
					onInputChange={(event, newInputValue) => {
						handleSearchChange(event, newInputValue);
					}}
					multiple
					renderOption={(props, option, { inputValue }) => {
						const matches = match(option, inputValue, { insideWords: true });
						const parts = parse(option, matches);

						return (
							<li {...props}>
								<div>
									{parts.map((part: any, index: any) => (
										<span
											key={index}
											style={{
												fontWeight: part.highlight ? 700 : 400,
												color: part.highlight ? "red" : "black",
											}}
										>
											{part.text}
										</span>
									))}
								</div>
							</li>
						);
					}}
					//   onFocus={() => setOnFocus(true)}
					//   on
				/>
			</Search>
			{/* Display all items */}
			{/* Align center button */}
			<Box
				sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
			>
				<PrimaryButton>
					<Typography variant="h5">Add to Pantry</Typography>
				</PrimaryButton>
			</Box>
		</Box>
	);
}

export default Pantry;
