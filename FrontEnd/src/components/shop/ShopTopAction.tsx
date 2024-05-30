import {setActiveLayout} from "../../helpers/product";

const ShopTopAction = ({
                           getLayout,
                           productCount,
                           sortedProductCount,
                           setOrderBy
                       }: any) => {
    return (
        <div className="shop-top-bar mb-35">
            <div className="select-shoing-wrap">
                <div className="shop-select">
                    <select onChange={e => {
                        console.log(e)
                        setOrderBy(e.target.value)
                    }}>
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
                    <i className="fa fa-th-large"/>
                </button>
                <button
                    onClick={e => {
                        getLayout("grid three-column");
                        setActiveLayout(e);
                    }}
                >
                    <i className="fa fa-th"/>
                </button>
                <button
                    onClick={e => {
                        getLayout("list");
                        setActiveLayout(e);
                    }}
                >
                    <i className="fa fa-list-ul"/>
                </button>
            </div>
        </div>
    );
};
export default ShopTopAction;
