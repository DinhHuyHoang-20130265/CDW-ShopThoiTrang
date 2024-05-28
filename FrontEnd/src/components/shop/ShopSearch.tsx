import React from "react";

const ShopSearch = ({setSearchValue}: any) => {
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Tìm kiếm </h4>
            <div className="pro-sidebar-search mb-50 mt-25">
                <form className="pro-sidebar-search-form" action="#">
                    <input type="text" placeholder="Tìm kiếm ở đây..."
                           onChange={(e: any) => setSearchValue(e.target.value)}/>
                    <button>
                        <i className="pe-7s-search"/>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ShopSearch;
