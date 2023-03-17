import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";
import Pantry from "../pages/PantryPage/Pantry";
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
        path: "/pantry",
        element: <PrivateRoute> <Pantry /> </PrivateRoute>
    }
]);

export default router;

