import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Shop from "../pages/user/Shop";
import DashBoard from "../pages/admin/DashBoard";
import React from "react";
import ProductDetailRoute from "./ProductDetailRoute";

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
                path: "shop",
                element: <Shop/>,

            }
            , {
                path: "product/:id",
                element: <ProductDetailRoute/>,
                loader: async (routeProps: any) => {
                    return routeProps;
                }
            }
            , {
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
