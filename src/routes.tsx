import {
    createBrowserRouter,
} from "react-router";
import HomePage from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomePage
    }
])

export default router