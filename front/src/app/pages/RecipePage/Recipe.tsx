import {
	Box,
	Button,
	Grid,
	LinearProgress,
	MenuItem,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../../components/DropDown";
import PrimaryButton from "../../components/PrimaryButton";
import { CustomizedTextField } from "../../components/TextField";
import theme from "../../theme/theme";
import { handlePost } from "../APIRequest";
import { RecipeQuestionAnswer, RecipeQuestions } from "./Question";

function Recipe() {
	const questions = RecipeQuestions;
	const [questionNum, setQuestionNum] = useState(0);
	const [progress, setProgress] = useState(0);
	const [answer, setAnswer] = useState<RecipeQuestionAnswer[]>([]);
	const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");
	
	const handleClickNext = async () => {
        if (answer[questionNum] === undefined || answer[questionNum].answer === "") {
            setErrorMsg("Please answer the question");
            console.log("Please answer the question");
            return;
        }

		if (questionNum === questions.length - 1) {
			const response = await handlePost("api/v1/dish", answer, true);

			if (response.status_code === 200) {
				console.log(response.data);

				navigate("/home/recipe-result", { state: response.data });
			} else {
				console.log(response);
			}
		}

		setQuestionNum(questionNum + 1);
		setProgress(progress + 100 / questions.length);
	};

	const handleAnswer = (curAnswer: string) => {
        console.log("start handleAnswer", answer);

        const newAnswer = [...answer];

        newAnswer[questionNum] = {
            question: questions[questionNum].question,
            answer: curAnswer,
        };

        setAnswer(newAnswer);
	};

    useEffect(() => {
        console.log(answer);
    }, [answer]);

	return (
		<Box
			sx={{
				display: "flex",
				height: "80%",
				weight: "80%",
				justifyContent: "center",
				marginLeft: "10%",
				marginRight: "10%",
				marginTop: "7%",
				borderRadius: "20px",
				// backgroundColor: theme.palette.primary.main,
				backgroundColor: theme.palette.error.main,
			}}
		>
			<Grid
				container
				direction="row"
				// justifyContent="space-evenly"
				// alignItems="stretch"
				sx={{
					height: "100%",
					width: "60%",
					// alignContent: "center",
					// alignItems: "center",
					// justifyContent: "center",
					// display: "flex",
				}}
			>
				<Grid
					item
					xs={12}
					md={12}
					lg={12}
					sx={{ width: "50%", textAlign: "center", marginTop: "10%" }}
				>
					{/* <Typography variant="h1" sx={{color: "#F4E9CD"}}>Progress Bar</Typography> */}
					<LinearProgress
						variant="determinate"
						value={progress}
						color="success"
						sx={{
							minHeight: "2vh",
							borderRadius: "20px",
							backgroundColor: theme.palette.primary.main,
							// Filling color
							"& .MuiLinearProgress-bar": {
								backgroundColor: "#F4E9CD",
							},
						}}
					/>
					<Typography variant="h2">
						{Math.round(progress)}% completed
					</Typography>
				</Grid>
				<Grid item xs={12} md={12} lg={12} sx={{ maxWidth: "50%" }}>
					<Typography variant="h2">
						{questions[questionNum].question}
					</Typography>
				</Grid>
				<Grid item xs={12} md={12} lg={12} sx={{ width: "50%" }}>
					{questions[questionNum].type === "select" ? (
						<DropDown
							onChange={(event: SelectChangeEvent<unknown>) => {
								handleAnswer(event.target.value as unknown as string);
							}}
                            value={answer[questionNum]?.answer || ""}
						>
							{questions[questionNum].options?.map((option) => (
								<MenuItem value={option} key={option}>{option}</MenuItem>
							))}
						</DropDown>
					) : (
						<CustomizedTextField
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								handleAnswer(event.target.value);
							}}
						/>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					md={12}
					lg={12}
					sx={{
						width: "50%",
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "flex-end",
						marginBottom: "6rem",
						marginTop: "-2rem",
                        flexDirection: "column",
					}}
				>
                    {
                        errorMsg !== "" && (
                            <Typography variant="h5" sx={{color: "red"}}>{errorMsg}</Typography>
                        )
                    }
					<PrimaryButton onClick={handleClickNext}>
						<Typography variant="h3">Next</Typography>
					</PrimaryButton>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Recipe;
