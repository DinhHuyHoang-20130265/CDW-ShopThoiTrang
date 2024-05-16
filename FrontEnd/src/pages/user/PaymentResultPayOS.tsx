import {Link, useLocation} from 'react-router-dom';

export const PaymentResultPayOS = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    return (
        <div>
            <div className="error404-area ptb-100 ptb-sm-60">
                <div className="container">
                    <div className="col">
                        <div className="col-md-12">
                            <div className=" text-center">
                                <div className="error-text">
                                    <h2>PAYOS Thanh toán thành công đơn hàng</h2>

                                    <div className="d-flex justify-content-center text-left">
                                        <table className="table table-hover" style={{width: "50%"}}>
                                            <thead>
                                            <tr>
                                                <th scope="col">Thông tin đơn hàng:</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th scope="row">Ngân hàng:</th>
                                            </tr>
                                            <tr>
                                                <th scope="row">Tổng thanh toán:</th>
                                            </tr>
                                            <tr>
                                                <th scope="row">Ngày thanh toán:</th>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="error-button">
                                    <Link to={"/home"} className="btn btn-primary">Quay về trang chủ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
