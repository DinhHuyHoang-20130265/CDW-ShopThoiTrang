import React from "react";
import FunFactItem from "../../components/fun-fact/FunFactItem";

const FunFact = ({spaceTopClass, spaceBottomClass, bgClass}: any) => {
    const funFactData = [
            {
                "id": "1",
                "iconClass": "pe-7s-portfolio",
                "countNum": 360,
                "title": "project done"
            },
            {
                "id": "2",
                "iconClass": "pe-7s-cup",
                "countNum": 690,
                "title": "cups of coffee"
            },
            {
                "id": "3",
                "iconClass": "pe-7s-light",
                "countNum": 100,
                "title": "branding"
            },
            {
                "id": "4",
                "iconClass": "pe-7s-smile",
                "countNum": 420,
                "title": "happy clients"
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
