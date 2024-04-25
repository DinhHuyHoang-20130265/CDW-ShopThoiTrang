import React, {Fragment} from "react";
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
                productFullDesc={product.description}
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
