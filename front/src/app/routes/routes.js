import { createBrowserRouter } from "react-router-dom";
import Page from "../pages/DashboardPage/index";
import {Layout} from "../pages/DashboardPage/Layout/layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Page />
    },
]);

export default router;