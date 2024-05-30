import React from "react";
import {setActiveSort} from "../../helpers/product";

const ShopCategories = ({categories, setCategories, categoriesSelected}: any) => {
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Danh mục </h4>
            <div className="sidebar-widget-list mt-30">
                {categories ? (
                    <ul>
                        <li>
                            <div className="sidebar-widget-list-left list-check-category">
                                <button onClick={e => {
                                    setCategories([]);
                                    setActiveSort(e, "all", "list-check-category");

                                }}>
                                    <span className="checkmark"/>Tất cả
                                </button>
                            </div>
                        </li>
                        {categories.map((category: any, key: any) => {
                            return (
                                <li key={key}>
                                    <div className="sidebar-widget-list-left list-check-category">
                                        <button
                                            onClick={e => {
                                                setActiveSort(e, "", "list-check-category");
                                                const isActive = e.currentTarget.classList.contains('active');
                                                if (isActive) {
                                                    setCategories([...categoriesSelected, category.name]);
                                                } else {
                                                    setCategories(categoriesSelected.filter((item: any) => item !== category.name));
                                                }
                                            }}
                                        >
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

export default ShopCategories;
