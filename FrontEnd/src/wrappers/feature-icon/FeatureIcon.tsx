import PropTypes from "prop-types";
import React from "react";
import FeatureIconItem from "../../components/feature-icon/FeatureIcon";

const FeatureIcon = ({spaceTopClass, spaceBottomClass}: any) => {
    const featureIconData = [
            {
                "id": 1,
                "image": "/assets/icon-img/support-1.png",
                "title": "Miễn phí vận chuyển",
                "subtitle": "Miễn phí vận chuyển cho tất cả đơn hàng có hoá đơn trên 500.000đ"
            },
            {
                "id": 2,
                "image": "/assets/icon-img/support-2.png",
                "title": "Hỗ trợ 24/7",
                "subtitle": "Hỗ trợ trực tuyến 24/7 cho tất cả khách hàng"
            },
            {
                "id": 3,
                "image": "/assets/icon-img/support-3.png",
                "title": "Hoàn tiền 100%",
                "subtitle": "Hoàn tiền 100% nếu sản phẩm không đúng như mô tả"
            },
            {
                "id": 4,
                "image": "/assets/icon-img/support-4.png",
                "title": "Giảm giá hàng tháng",
                "subtitle": "Giảm giá hàng tháng cho tất cả khách hàng thân thiết"
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
