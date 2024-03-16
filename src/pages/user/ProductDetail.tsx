import React, {Fragment} from "react";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {Breadcrumb} from "react-bootstrap";
import {connect} from "react-redux";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";

const ProductDetail = ({match, product}: any) => {


    return (
        <>
            {product ? (<Fragment>

                    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
                    <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
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
            ) : <></>}
        </>
    );
};


const mapStateToProps = (state: any, ownProps: any) => {
    const itemId = ownProps.match.params.id;
    return {
        product: state.productData.products.filter(
            (single: any) => single.id === itemId
        )[0]
    };
};

export default connect(mapStateToProps)(ProductDetail);
