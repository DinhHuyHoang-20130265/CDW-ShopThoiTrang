import React from "react";
import ProductDetail from "../pages/user/ProductDetail";
import {useLoaderData} from "react-router";

const ProductDetailRoute = () => {
    const match = useLoaderData();
    return <ProductDetail match={match}/>;
};

export default ProductDetailRoute;
