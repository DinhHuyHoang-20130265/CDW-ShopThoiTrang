import React, {Fragment} from "react";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {Breadcrumb} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";

const ProductTabLeft = (params : any) => {
    const { pathname } = location;

    return (
        <Fragment>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Shop Product
            </BreadcrumbsItem>

                {/* breadcrumb */}
                <Breadcrumb />

                {/* product description with image */}
                <ProductImageDescription
                    spaceTopClass="pt-100"
                    spaceBottomClass="pb-100"
                    product={params.product}
                    galleryType="leftThumb"
                />

                {/* product description tab */}
                <ProductDescriptionTab
                    spaceBottomClass="pb-90"
                    productFullDesc={params.product.fullDescription}
                />

                {/* related product slider */}
                <RelatedProductSlider
                    spaceBottomClass="pb-95"
                    category={params.product.category[0]}
                />
        </Fragment>
    );
};

ProductTabLeft.propTypes = {
    location: PropTypes.object,
    product: PropTypes.object
};

const mapStateToProps = (state : any, ownProps : any) => {
    const itemId = ownProps.match.params.id;
    return {
        product: state.productData.products.filter(
            (single : any) => single.id === itemId
        )[0]
    };
};

export default connect(mapStateToProps)(ProductTabLeft);
