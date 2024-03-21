import PropTypes from "prop-types";
import React from "react";
import FeatureIconItem from "../../components/feature-icon/FeatureIcon";

const FeatureIcon = ({spaceTopClass, spaceBottomClass}: any) => {
    const featureIconData = [
            {
                "id": 1,
                "image": "/assets/icon-img/support-1.png",
                "title": "Free Shipping",
                "subtitle": "Free shipping on all order"
            },
            {
                "id": 2,
                "image": "/assets/icon-img/support-2.png",
                "title": "Support 24/7",
                "subtitle": "Free shipping on all order"
            },
            {
                "id": 3,
                "image": "/assets/icon-img/support-3.png",
                "title": "Money Return",
                "subtitle": "Free shipping on all order"
            },
            {
                "id": 4,
                "image": "/assets/icon-img/support-4.png",
                "title": "Order Discount",
                "subtitle": "Free shipping on all order"
            }
        ]

    ;


    return (
        <div
            className={`support-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""}`}>
            <div className="container">
                <div className="row">
                    {featureIconData.map((singleFeature: any) => {
                        return (
                            <FeatureIconItem
                                singleFeature={singleFeature}
                                key={singleFeature.id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

FeatureIcon.propTypes = {
    spaceBottomClass: PropTypes.any,
    spaceTopClass: PropTypes.any
};

export default FeatureIcon;
