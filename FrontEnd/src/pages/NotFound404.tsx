import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";

const NotFound404 = () => {

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="error-area pt-40 pb-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7 col-lg-8 text-center">
                            <div className="error">
                                <h1>404</h1>
                                <h2>OOPS! PAGE NOT FOUND</h2>
                                <p>
                                    Xin lỗi nhưng trang bạn đang tìm kiếm không tồn tại, có thể
                                    đã bị xóa, tên đã thay đổi hoặc tạm thời không có sẵn.
                                </p>
                                <Link to={"/"} className="error-btn">
                                    Quay về trang chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


export default NotFound404;
