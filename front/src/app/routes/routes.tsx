import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    }
]);

export default router;

