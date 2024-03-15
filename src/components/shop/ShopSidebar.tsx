import React from "react";
import PropTypes from "prop-types";
import ShopSearch from "./ShopSearch";
import ShopCategories from "./ShopCategories";
import ShopColor from "./ShopColor";
import ShopSize from "./ShopSize";
import {
    getIndividualCategories,
    getIndividualColors,
    getProductsIndividualSizes
} from "../../helpers/product";
const ShopSidebar = ({ products, getSortParams, sideSpaceClass } : any) => {
    const uniqueCategories = getIndividualCategories(products);
    const uniqueColors = getIndividualColors(products);
    const uniqueSizes = getProductsIndividualSizes(products);

    return (
        <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
            {/* shop search */}
            <ShopSearch />

            {/* filter by categories */}
            <ShopCategories
                categories={uniqueCategories}
                getSortParams={getSortParams}
            />

            {/* filter by color */}
            <ShopColor colors={uniqueColors} getSortParams={getSortParams} />

            {/* filter by size */}
            <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} />

        </div>
    );
};

ShopSidebar.propTypes = {
    getSortParams: PropTypes.func,
    products: PropTypes.array,
    sideSpaceClass: PropTypes.string
};

export default ShopSidebar;