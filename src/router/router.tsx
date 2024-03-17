import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Shop from "../pages/user/Shop";
import DashBoard from "../pages/admin/DashBoard";
import React from "react";
import ProductDetail, {loadId} from "../pages/user/ProductDetail";
import ShoppingCart from "../pages/user/ShoppingCart";

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

            }, {
                path: "shopping-cart",
                element: <ShoppingCart/>,
            }
            , {
                path: "product/:id",
                element: <ProductDetail/>,
                loader: loadId
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
