import React from "react";
import VoucherItemHome from "./VoucherItemHome";

const VoucherContainer = ({spaceTopClass, spaceBottomClass}: any) => {
    const voucherList = [
        {}, {}, {}, {}
    ]
    return (
        <div
            className={` ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}>
            <div className="container container-1265">
                <div className="row scroll coupon_bill">
                    {voucherList && voucherList.map((item: any) => {
                        return (
                            <VoucherItemHome
                                item={item}
                                key={item.id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default VoucherContainer;
