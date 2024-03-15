import React from "react";

const FeatureIconItem = ({singleFeature}: any) => {
    return (
        <div className="col-lg-3 col-sm-6">
            <div className="support-wrap mb-30">
                <div className="support-icon">
                    <img

                        className="animated"
                        src={singleFeature.image}
                        alt=""
                    />
                </div>
                <div className="support-content">
                    <h5>{singleFeature.title}</h5>
                    <p>{singleFeature.subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default FeatureIconItem;
