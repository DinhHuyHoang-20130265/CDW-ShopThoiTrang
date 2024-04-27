import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import {useLoaderData} from "react-router";

export function loadId({params}: any) {
    return {id: parseInt(params.id)};
}

const ProductDetail = () => {
    const received: any = useLoaderData()
    const product = useSelector((state: any) =>
            state.productData.products.filter(
                (single: any) => single.id === received.id)[0]
        )
    ;

    return (
        <Fragment>
            <Breadcrumb/>

            <ProductImageDescription
                spaceTopClass="pt-100"
                spaceBottomClass="pb-100"
                product={product}
            />

            <ProductDescriptionTab
                spaceBottomClass="pb-90"
                productFullDesc={product.description}
            />

            <RelatedProductSlider
                spaceBottomClass="pb-95"
                category={product.categories[0].name}
            />
        </Fragment>
    );
};
export default ProductDetail
