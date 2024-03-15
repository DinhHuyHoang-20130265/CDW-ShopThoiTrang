import PropTypes from "prop-types";
import React from "react";
import ProductGrid from "../../wrappers/product/ProductGrid";

const ShopProducts = ({ products , layout } : any) => {
    return (
        <div className="shop-bottom-area mt-35">
            <div className={`row ${layout ? layout : ""}`}>
                <ProductGrid products={products} spaceBottomClass="mb-25" />
            </div>
        </div>
    );
};

ShopProducts.propTypes = {
    layout: PropTypes.string,
    products: PropTypes.array
};

export default ShopProducts;
