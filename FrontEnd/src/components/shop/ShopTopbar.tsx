import React, {Fragment} from "react";
import ShopTopAction from "./ShopTopAction";

const ShopTopbar = ({
                        getLayout,
                        productCount,
                        sortedProductCount,
                        setOrderBy
                    }: any) => {
    return (
        <Fragment>
            <ShopTopAction
                getLayout={getLayout}
                setOrderBy={setOrderBy}
                productCount={productCount}
                sortedProductCount={sortedProductCount}
            />
        </Fragment>
    );
};

export default ShopTopbar;
