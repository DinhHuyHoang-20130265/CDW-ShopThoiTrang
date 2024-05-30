import React from "react";
import {setActiveSort} from "../../helpers/product";

const ShopColor = ({colors, setColors, colorsSelected}: any) => {
    return (
        <div className="sidebar-widget mt-50">
            <h4 className="pro-sidebar-title">Màu sắc </h4>
            <div className="sidebar-widget-list mt-20">
                {colors ? (
                    <ul>
                        <li>
                            <div className="sidebar-widget-list-left list-check-color">
                                <button
                                    onClick={e => {
                                        setColors([]);
                                        setActiveSort(e, "all", "list-check-color");
                                    }}
                                >
                                    <span className="checkmark"/> Tất cả{" "}
                                </button>
                            </div>
                        </li>
                        {colors.map((color: any, key: any) => {
                            return (
                                <li key={key}>
                                    <div className="sidebar-widget-list-left list-check-color">
                                        <button
                                            onClick={e => {
                                                setActiveSort(e, "", "list-check-color");
                                                const isActive = e.currentTarget.classList.contains('active');
                                                if (isActive) {
                                                    setColors([...colorsSelected, color]);
                                                } else {
                                                    setColors(colorsSelected.filter((item: any) => item !== color));
                                                }
                                            }}
                                        >
                                            <span className="checkmark"/> {color}{" "}
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

export default ShopColor;
