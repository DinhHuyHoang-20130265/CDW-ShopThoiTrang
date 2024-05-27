import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {deleteAllFromCart} from "../../store/actions/cartActions";
import moment from "moment/moment";
import {connect} from "react-redux";

const PaymentResultPayOS = ({deleteAllFromCart}: any) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code: any = queryParams.get('code');
    const orderCode: any = queryParams.get('orderCode');
    const success: any = queryParams.get('success');
    const [orderInfo, setOrderInfo] = useState([]);
    const currentTimestamp = Date.now();
    const formattedTimestamp = moment(currentTimestamp).format('YYYY-MM-DD HH:mm:ss.SSS');
    const navigate = useNavigate();
    useEffect(() => {
        let order: any = localStorage.getItem("order");
        let orderBody: any = localStorage.getItem("orderbody");
        if (order === null || code === null) {
            navigate("/home");
        }
        if (success === "true" && order !== null) {
            try {
                let parsedOrder = JSON.parse(order);
                parsedOrder = {
                    ...parsedOrder,
                    status: 2,
                    paymentCode: orderCode,
                    paymentDate: formattedTimestamp,
                    paymentStatus: "yes",
                };
                let parsedOrderBody = JSON.parse(orderBody);
                setOrderInfo(parsedOrderBody.map((item: any) => `${item.name} - SL: ${item.quantity} x ${item.price} đ`));
                console.log(parsedOrderBody)

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
                navigate("/home");
                toast.error("Có lỗi trong quá trình đặt hàng: ", error);
            }
        } else {
            try {
                const parsedOrder = JSON.parse(order);
                let parsedOrderBody = JSON.parse(orderBody);
                setOrderInfo(parsedOrderBody.map((item: any) => `${item.name} - SL: ${item.quantity} x ${item.price} đ`));
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
                navigate("/home");
                toast.error("Có lỗi trong quá trình huỷ đơn hàng: ", error);
            }
        }
    }, []);
    return (
        <div>
            <div className="error404-area ptb-100 ptb-sm-60">
                <div className="container">
                    <div className="col">
                        <div className="col-md-12">
                            <div className=" text-center">
                                <div className="error-text">
                                    <h2>PAYOS {code === "00" ? "Huỷ" : ""} thanh toán thành công đơn hàng</h2>

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
                                                <th scope="row">Mã đơn hàng:</th>
                                                <td>{orderCode}</td>
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
export default connect(mapStateToProps, mapDispatchToProps)(PaymentResultPayOS);
