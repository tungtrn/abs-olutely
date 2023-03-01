import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute> <Home /> </PrivateRoute>
    },
    {
        path: "/login",
        element: <Login />
    }
]);

export default router;

