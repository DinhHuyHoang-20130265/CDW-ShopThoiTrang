import React from "react";
import PropTypes from "prop-types";
import {setActiveSort} from "../../helpers/product";

const ShopColor = ({ colors, getSortParams } : any) => {
    return (
        <div className="sidebar-widget mt-50">
            <h4 className="pro-sidebar-title">Màu sắc </h4>
            <div className="sidebar-widget-list mt-20">
                {colors ? (
                    <ul>
                        <li>
                            <div className="sidebar-widget-list-left">
                                <button
                                    onClick={e => {
                                        getSortParams("color", "");
                                        setActiveSort(e);
                                    }}
                                >
                                    <span className="checkmark" /> Tất cả{" "}
                                </button>
                            </div>
                        </li>
                        {colors.map((color : any, key : any) => {
                            return (
                                <li key={key}>
                                    <div className="sidebar-widget-list-left">
                                        <button
                                            onClick={e => {
                                                getSortParams("color", color);
                                                setActiveSort(e);
                                            }}
                                        >
                                            <span className="checkmark" /> {color}{" "}
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    "Không tìm thấy màu sắc"
                )}
            </div>
        </div>
    );
};

ShopColor.propTypes = {
    colors: PropTypes.array,
    getSortParams: PropTypes.func
};

export default ShopColor;
