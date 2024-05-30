import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({spaceTopClass, spaceBottomClass}: any) => {
    return (
        <div
            className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
            }`}
        >
            <div className="container">
                <div className="welcome-content text-center">
                    <h5>Chúng Tôi Là Ai</h5>
                    <h1>Chào Mừng Đến Với Shop 2h - P&T</h1>
                    <p>
                        Shop 2h - P&T tự hào là đơn vị tiên phong hàng đầu trong lĩnh vực thời trang. Chúng
                        tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng và dịch vụ tận tâm. Đội ngũ chuyên
                        gia của chúng tôi luôn sẵn sàng hỗ trợ và đáp ứng mọi nhu cầu của bạn. Hãy cùng nhau trải
                        nghiệm sự khác biệt và khám phá những giá trị tuyệt vời mà chúng tôi mang lại.
                    </p>
                </div>
            </div>
        </div>
    );
};

SectionTitleWithText.propTypes = {
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
