import { createBrowserRouter } from "react-router-dom";
import Base from "../pages/BasePage/Base";
import Home from "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";
import Pantry from "../pages/PantryPage/Pantry";
import Recipe from "../pages/RecipePage/Recipe";
import RecipeResult from "../pages/RecipePage/RecipeResult";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute> <Home /> </PrivateRoute>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/home",
        element: <PrivateRoute> <Base /> </PrivateRoute>,
        children: [
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
            }
        ]
    }
]);

export default router;

