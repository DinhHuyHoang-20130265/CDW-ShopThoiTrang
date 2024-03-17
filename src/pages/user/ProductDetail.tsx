import React, {Fragment} from "react";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {useSelector} from "react-redux";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import {useLoaderData} from "react-router";

export function loadId({params}: any) {
    return {id: params.id};
}

const ProductDetail = () => {

    const received: any = useLoaderData()
    const product = useSelector((state: any) => state.productData.products.filter(
        (single: any) => single.id === received.id
    )[0])

    return (
        <Fragment>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/shop"}>
                Shop Product
            </BreadcrumbsItem>

            {/* breadcrumb */}
            <Breadcrumb/>

            {/* product description with image */}
            <ProductImageDescription
                spaceTopClass="pt-100"
                spaceBottomClass="pb-100"
                product={product}
            />

            {/* product description tab */}
            <ProductDescriptionTab
                spaceBottomClass="pb-90"
                productFullDesc={product.fullDescription}
            />

            {/* related product slider */}
            <RelatedProductSlider
                spaceBottomClass="pb-95"
                category={product.category[0]}
            />
        </Fragment>
    );
};
export default ProductDetail
