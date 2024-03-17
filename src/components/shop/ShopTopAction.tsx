import {setActiveLayout} from "../../helpers/product";
import PropTypes from "prop-types";

const ShopTopAction = ({
                           getLayout,
                           getFilterSortParams,
                           productCount,
                           sortedProductCount
                       } : any) => {
    return (
        <div className="shop-top-bar mb-35">
            <div className="select-shoing-wrap">
                <div className="shop-select">
                    <select
                        onChange={e => getFilterSortParams("filterSort", e.target.value)}
                    >
                        <option value="default">Mặc định</option>
                        <option value="priceHighToLow">Giá - Cao đến Thấp</option>
                        <option value="priceLowToHigh">Giá - Thấp đến Cao</option>
                    </select>
                </div>
                <p>
                    Hiển thị {sortedProductCount} trên {productCount} sản phẩm
                </p>
            </div>

            <div className="shop-tab">
                <button
                    onClick={e => {
                        getLayout("grid two-column");
                        setActiveLayout(e);
                    }}
                >
                    <i className="fa fa-th-large" />
                </button>
                <button
                    onClick={e => {
                        getLayout("grid three-column");
                        setActiveLayout(e);
                    }}
                >
                    <i className="fa fa-th" />
                </button>
                <button
                    onClick={e => {
                        getLayout("list");
                        setActiveLayout(e);
                    }}
                >
                    <i className="fa fa-list-ul" />
                </button>
            </div>
        </div>
    );
};

ShopTopAction.propTypes = {
    getFilterSortParams: PropTypes.func,
    getLayout: PropTypes.func,
    productCount: PropTypes.number,
    sortedProductCount: PropTypes.number
};

export default ShopTopAction;
