import React from "react";
import {setActiveSort} from "../../helpers/product";

const ShopSize = ({sizes, setSizes, sizesSelected}: any) => {
    return (
        <div className="sidebar-widget mt-40">
            <h4 className="pro-sidebar-title">Kích thước </h4>
            <div className="sidebar-widget-list mt-20">
                {sizes ? (
                    <ul>
                        <li>
                            <div className="sidebar-widget-list-left list-check-size">
                                <button
                                    onClick={e => {
                                        setSizes([]);
                                        setActiveSort(e, "all", "list-check-size");
                                    }}
                                >
                                    <span className="checkmark"/> Tất cả{" "}
                                </button>
                            </div>
                        </li>
                        {sizes.map((size: any, key: any) => {
                            return (
                                <li key={key}>
                                    <div className="sidebar-widget-list-left list-check-size">
                                        <button
                                            onClick={e => {
                                                setActiveSort(e, "", "list-check-size");
                                                const isActive = e.currentTarget.classList.contains('active');
                                                if (isActive) {
                                                    setSizes([...sizesSelected, size]);
                                                } else {
                                                    setSizes(sizesSelected.filter((item: any) => item !== size));
                                                }
                                            }}
                                        >
                                            {" "}
                                            <span className="checkmark"/>
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

export default ShopSize;
