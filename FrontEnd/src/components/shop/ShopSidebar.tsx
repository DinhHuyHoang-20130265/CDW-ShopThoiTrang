import React from "react";
import ShopSearch from "./ShopSearch";
import ShopCategories from "./ShopCategories";
import ShopColor from "./ShopColor";
import ShopSize from "./ShopSize";
import {
    getIndividualCategories,
    getIndividualColors,
    getProductsIndividualSizes
} from "../../helpers/product";

const ShopSidebar = ({
                         products,
                         setColors,
                         setSizes,
                         setCategories,
                         setSearchValue,
                         sideSpaceClass,
                         sizes,
                         colors,
                         categories
                     }: any) => {
    const uniqueCategories = getIndividualCategories(products);
    const uniqueColors = getIndividualColors(products);
    const uniqueSizes = getProductsIndividualSizes(products);

    return (
        <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
            <ShopSearch setSearchValue={setSearchValue}/>

            <ShopCategories categories={uniqueCategories} setCategories={setCategories}
                            categoriesSelected={categories}/>

            <ShopColor colors={uniqueColors} setColors={setColors} colorsSelected={colors}/>

            <ShopSize sizes={uniqueSizes} setSizes={setSizes} sizesSelected={sizes}/>

        </div>
    );
};

export default ShopSidebar;
