import {Link, useLocation, useNavigate} from 'react-router-dom';
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import {useEffect, useState} from "react";
import moment from "moment";
import toast from "react-hot-toast";
import {deleteAllFromCart} from "../../store/actions/cartActions";
import {connect} from "react-redux";

const PaymentResult = ({deleteAllFromCart}: any) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const vnp_Amount: any = queryParams.get('vnp_Amount');
    const vnp_BankCode = queryParams.get('vnp_BankCode');
    const vnp_PayDate = queryParams.get('vnp_PayDate');
    const [orderInfo, setOrderInfo] = useState([]);
    const vnp_TxnRef = queryParams.get('vnp_TxnRef');
    const vnp_TransactionStatus = queryParams.get('vnp_TransactionStatus');
    const PayDate = moment(vnp_PayDate, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss.SSS');
    const navigate = useNavigate();

    useEffect(() => {
        let order: any = localStorage.getItem("order");
        let orderBody: any = localStorage.getItem("orderbody");
        if (order === null || vnp_TransactionStatus === null) {
            navigate("/home");
        }
        if (order !== null && vnp_TransactionStatus === "00") {
            let parsedOrder = JSON.parse(order);
            parsedOrder = {
                ...parsedOrder,
                status: 2,
                paymentCode: vnp_TxnRef,
                paymentDate: PayDate,
                paymentStatus: "yes",
            };
            let parsedOrderBody = JSON.parse(orderBody);
            setOrderInfo(parsedOrderBody.map((item: any) => `${item.name} - SL: ${item.quantity} x ${item.price} đ`));
            try {
                axios.post(`${process.env.REACT_APP_API_ENDPOINT}order`, parsedOrder, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    withCredentials: true,
                }).then((response) => {
                    if (response.status === 200) {
                        toast.success("Đặt hàng thành công");
                        localStorage.removeItem("order");
                        localStorage.removeItem("orderbody");
                        deleteAllFromCart(null);
                    }
                }).catch((error) => {
                    toast.error("Đặt hàng thất bại: ", error);
                    localStorage.removeItem("order");
                    localStorage.removeItem("orderbody");
                });
            } catch (error: any) {
                toast.error("Có lỗi trong quá trình đặt hàng: ", error);
                navigate("/home");
            }
        } else if (order !== null && vnp_TransactionStatus === "02") {
            try {
                const parsedOrder = JSON.parse(order);
                axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel', {
                    order_codes: [parsedOrder.shippingCode],
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Token": process.env.REACT_APP_GHN_TOKEN,
                        "ShopId": process.env.REACT_APP_GHN_SHOP_ID,
                    }
                })
                toast.success("Huỷ thanh toán thành công");
                localStorage.removeItem("order");
                localStorage.removeItem("orderbody");
            } catch (error: any) {
                toast.error("Có lỗi trong quá trình huỷ thanh toán: ", error);
                navigate("/home");
            }
        }

    }, [vnp_TxnRef, vnp_TransactionStatus]);

    return (
        <div>
            <div className="error404-area ptb-100 ptb-sm-60">
                <div className="container">
                    <div className="col">
                        <div className="col-md-12">
                            <div className=" text-center">
                                <div className="error-text">
                                    <h2>{vnp_TransactionStatus === "02" ? "Huỷ" : ""} Thanh toán thành công đơn
                                        hàng</h2>

                                    <div className="d-flex justify-content-center text-left">
                                        <table className="table table-hover" style={{width: "50%"}}>
                                            <thead>
                                            <tr>
                                                <th scope="col" style={{
                                                    verticalAlign: "middle"
                                                }}><p>Thông tin đơn hàng:</p></th>
                                                <td scope="col">{
                                                    orderInfo.length > 0 && orderInfo.map((item: string) => {
                                                        return <p>{item}</p>
                                                    })}</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th scope="row">Ngân hàng:</th>
                                                <td>{vnp_BankCode}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Tổng thanh toán:</th>
                                                <td><CurrencyFormat value={parseInt(vnp_Amount) / 100}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}/> VNĐ
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Ngày thanh toán:</th>
                                                <td>{PayDate}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Trạng thái:</th>
                                                <td>{vnp_TransactionStatus === "02" ? "Đã huỷ thanh toán" : "Đã thanh toán"}</td>
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
const mapStateToProps = (state: any) => {
    return {
        cartItems: state.cartData
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteAllFromCart: (addToast: any) => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentResult);
