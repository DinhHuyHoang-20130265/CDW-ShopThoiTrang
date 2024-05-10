import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Shop from "../pages/user/Shop";
import React from "react";
import ProductDetail, {loadId} from "../pages/user/ProductDetail";
import ShoppingCart from "../pages/user/ShoppingCart";
import Checkout from "../pages/user/Checkout";
import MyAccount from "../pages/user/MyAccount";
import LoginRegister from "../pages/user/LoginRegister";
import ForgotPassword from "../pages/user/ForgotPassword";
import Contact from "../pages/user/Contact";
import WishList from "../pages/user/WishList";
import Posts from "../pages/user/Posts";
import PostDetail from "../pages/user/PostDetail";
import NotFound404 from "../pages/NotFound404";
import {PaymentResult} from "../pages/user/PaymentResult";

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
                path: "post",
                element: <Posts/>,
            }, {
                path: "post-detail/:id",
                element: <PostDetail/>,
            }, {
                path: "cart",
                element: <ShoppingCart/>,
            }, {
                path: "wishlist",
                element: <WishList/>,
            }, {
                path: "checkout",
                element: <Checkout/>,
            }, {
                path: "my-account",
                element: <MyAccount/>,
            }, {
                path: "login-register",
                element: <LoginRegister/>,
            }, {
                path: "product/:id",
                element: <ProductDetail/>,
                loader: loadId
            }, {
                path: "forgot-password",
                element: <ForgotPassword/>,
                loader: loadId
            }, {
                path: "about",
                element: <About/>,
                loader: loadId
            }, {
                path: "contact",
                element: <Contact/>,
                loader: loadId
            },
            {
                path: "/payment-result",
                element: <PaymentResult/>
            }
            , {
                path: "/*",
                element: <NotFound404/>
            }
        ]
    },
]);
