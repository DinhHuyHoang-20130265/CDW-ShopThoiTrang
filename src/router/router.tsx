import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import DashBoard from "../pages/admin/DashBoard";

export const webRouter = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            }, {
                path: "home",
                element: <Home/>,
            }, {
                path: "about",
                element: <About/>,
            }, {
                path: "admin",
                element: <DashBoard/>,
                children: [
                    {
                        path: "dashboard",
                        element: <DashBoard/>,
                    }
                ]
            }]
    },
]);
