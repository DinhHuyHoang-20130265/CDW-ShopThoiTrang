import React, {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import {useLoaderData} from "react-router";
import axios from "axios";

export function loadId({params}: any) {
    return {id: parseInt(params.id)};
}

const ProductDetail = () => {
    const received: any = useLoaderData()
    const product = useSelector((state: any) =>
        state.productData.products.filter(
            (single: any) => single.id === received.id)[0]
    );
    if (product.imgProducts.find((item: any) => item.url === product.imageUrl) === undefined)
        product.imgProducts.push({url: product.imageUrl});

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fectch = async () => {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}review/product/${product.id}`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                }
            }).then((response: any) => {
                setReviews(response.data);
            })
        }
        fectch();
    }, []);

    return (
        <Fragment>
            <Breadcrumb/>

            <ProductImageDescription
                spaceTopClass="pt-100"
                spaceBottomClass="pb-100"
                product={product}
                reviews={reviews}
            />

            <ProductDescriptionTab
                spaceBottomClass="pb-90"
                productFullDesc={product.description}
                product={product}
                reviews={reviews}
            />

            <RelatedProductSlider
                spaceBottomClass="pb-95"
                category={product.categories[0].name}
            />
        </Fragment>
    );
};
export default ProductDetail
