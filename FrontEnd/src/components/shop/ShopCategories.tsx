import React from "react";
import PropTypes from "prop-types";
import {setActiveSort} from "../../helpers/product";

const ShopCategories = ({categories, getSortParams}: any) => {
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Danh mục </h4>
            <div className="sidebar-widget-list mt-30">
                {categories ? (
                    <ul>
                        <li>
                            <div className="sidebar-widget-list-left">
                                <button
                                    onClick={e => {
                                        getSortParams("category", "");
                                        setActiveSort(e);
                                    }}
                                >
                                    <span className="checkmark"/> Tất cả
                                </button>
                            </div>
                        </li>
                        {categories.map((category: any, key: any) => {
                            return (
                                <li key={key}>
                                    <div className="sidebar-widget-list-left">
                                        <button
                                            onClick={e => {
                                                getSortParams("category", category.name);
                                                setActiveSort(e);
                                            }}
                                        >
                                            {" "}
                                            <span className="checkmark"/> {category.name}{" "}
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    "Không tìm thấy danh mục"
                )}
            </div>
        </div>
    );
};

ShopCategories.propTypes = {
    categories: PropTypes.array,
    getSortParams: PropTypes.func
};

export default ShopCategories;
