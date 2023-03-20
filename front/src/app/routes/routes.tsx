import { createBrowserRouter } from "react-router-dom";
import Base from "../pages/BasePage/Base";
import Login from "../pages/LoginPage/Login";
import Pantry from "../pages/PantryPage/Pantry";
import Recipe from "../pages/RecipePage/Recipe";
import RecipeResult from "../pages/RecipePage/RecipeResult";
import PrivateRoute from "./PrivateRoute";
import Page from "../pages/DashboardPage/index";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <PrivateRoute> <Base /> </PrivateRoute>,
        children: [
            {
                path: "dashboard",
                element: <Page />
            },
            {
                path: "pantry",
                element: <Pantry />
            },
            {
                path: "recipe",
                element: <Recipe /> 
            },
            {
                path: "recipe-result",
                element: <RecipeResult />
            },
        ]
    }
]);

export default router;

