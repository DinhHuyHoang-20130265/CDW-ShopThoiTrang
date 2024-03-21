import PropTypes from "prop-types";
import React from "react";
import ProductGridForShop from "../../wrappers/product/ProductGridForShop";

const ShopProducts = ({products, layout}: any) => {
    return (
        <div className="shop-bottom-area mt-35">
            <div className={`row ${layout ? layout : ""}`}>
                <ProductGridForShop products={products} spaceBottomClass="mb-25"/>
            </div>
        </div>
    );
};

ShopProducts.propTypes = {
    layout: PropTypes.string,
    products: PropTypes.array
};

export default ShopProducts;
