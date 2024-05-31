import React from "react";
import FunFactItem from "../../components/fun-fact/FunFactItem";

const FunFact = ({spaceTopClass, spaceBottomClass, bgClass}: any) => {
    const funFactData = [
            {
                "id": "1",
                "iconClass": "pe-7s-portfolio",
                "countNum": 50,
                "title": "Các sản phẩm đã hoàn thiện"
            },
            {
                "id": "2",
                "iconClass": "pe-7s-cup",
                "countNum": 10,
                "title": "Hơn 10 giải thướng"
            },
            {
                "id": "3",
                "iconClass": "pe-7s-light",
                "countNum": 1000,
                "title": "Khách hàng"
            },
            {
                "id": "4",
                "iconClass": "pe-7s-smile",
                "countNum": 5,
                "title": "Chi nhánh tại TP.HCM"
            }
        ]
    ;

    return (
        <div
            className={`funfact-area ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
            } ${bgClass ? bgClass : ""}`}
        >
            <div className="container">
                <div className="row">
                    {funFactData &&
                        funFactData.map((single, key) => {
                            return (
                                <FunFactItem
                                    data={single}
                                    spaceBottomClass="mb-30"
                                    key={key}
                                    textAlignClass="text-center"
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};


export default FunFact;
