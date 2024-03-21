import React from "react";
import PropTypes from "prop-types";
import {setActiveSort} from "../../helpers/product";

const ShopSize = ({ sizes, getSortParams } : any) => {
    return (
        <div className="sidebar-widget mt-40">
            <h4 className="pro-sidebar-title">Kích thước </h4>
            <div className="sidebar-widget-list mt-20">
                {sizes ? (
                    <ul>
                        <li>
                            <div className="sidebar-widget-list-left">
                                <button
                                    onClick={e => {
                                        getSortParams("size", "");
                                        setActiveSort(e);
                                    }}
                                >
                                    <span className="checkmark" /> Tất cả{" "}
                                </button>
                            </div>
                        </li>
                        {sizes.map((size : any, key : any) => {
                            return (
                                <li key={key}>
                                    <div className="sidebar-widget-list-left">
                                        <button
                                            className="text-uppercase"
                                            onClick={e => {
                                                getSortParams("size", size);
                                                setActiveSort(e);
                                            }}
                                        >
                                            {" "}
                                            <span className="checkmark" />
                                            {size}{" "}
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    "Không tim thấy size"
                )}
            </div>
        </div>
    );
};

ShopSize.propTypes = {
    getSortParams: PropTypes.func,
    sizes: PropTypes.array
};

export default ShopSize;
