import React, {Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import CryptoJS from 'crypto-js';
import {getDiscountPrice} from "../../helpers/product";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {FormControl, FormControlLabel, FormLabel} from "@mui/material";
import toast from "react-hot-toast";
import {ClipLoader} from "react-spinners";
import {deleteAllFromCart} from "../../store/actions/cartActions";

function formatNumber(number: any) {
    let numberStr = number.toString();

    let [integerPart, decimalPart] = numberStr.split(".");

    if (decimalPart === undefined) {
        decimalPart = "00";
    } else if (decimalPart.length === 1) {
        decimalPart = decimalPart + "0";
    }

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return integerPart + "." + decimalPart;
}

const Checkout = ({cartItems, deleteAllFromCart}: any) => {
    let cartTotalPrice = 0;
    const [isLoading, setIsLoading]: any = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince]: any = useState(null);
    const [selectedDistrict, setSelectedDistrict]: any = useState(null);
    const [selectedWard, setSelectedWard]: any = useState(null);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(-1);

    const [coupon, setCoupon]: any = useState(null);
    const [couponCode, setCouponCode] = useState("");
    const [couponCheck, setCouponCheck] = useState(false);
    const [fee, setFee] = useState(0);
    const [paymentType, setPaymentType] = useState('cod');
    const navigate = useNavigate();
    useEffect(() => {
    }, [isLoading, cartItems]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            setUserId(userObj.id);
            const fetchInfo = async () => {
                await axios.get(`${process.env.REACT_APP_API_ENDPOINT}user/${userObj.id}`, {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                }).then((response: any) => {
                    setName(response.data.userInfo.fullName);
                    setPhone(response.data.userInfo.phone);
                    setEmail(response.data.userInfo.email);
                }).catch((error) => {
                    console.log(error);
                })
            }
            fetchInfo();
        } else {
            navigate("/login-register");
        }
    }, [navigate]);

    const RETURN_URL = "https://a262-42-112-74-243.ngrok-free.app/api/payos";
    const CANCEL_URL = "https://a262-42-112-74-243.ngrok-free.app/api/payos";

    const handleCheckCoupon = async () => {
        if (couponCode === "") {
            toast.error("Vui lòng nhập mã giảm giá");
            return;
        }
        setCouponCheck(true);
        setTimeout(async () => {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}coupon/check/${couponCode}`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }).then((response) => {
                if (response.data) {
                    if (response.data.status === false || response.data.quantity === 0 || response.data.expiredDate < new Date().toISOString()) {
                        toast.error("Mã giảm giá đã hết hạn");
                        return;
                    }
                    setCoupon(response.data);
                    toast.success("Mã giảm giá hợp lệ");
                } else {
                    toast.error("Mã giảm giá không hợp lệ");
                }
            }).catch((error) => {
                toast.error(error);
            })
            setCouponCheck(false);
        }, 1000)
    }

    const getDistricts = async (provinceId: any) => {
        await axios.get(process.env.REACT_APP_GHN_API + `district?province_id=${provinceId}`, {
            headers: {
                "Content-Type": "application/json",
                "Token": process.env.REACT_APP_GHN_TOKEN,
            },
        }).then((response) => {
            setDistricts(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    const getWards = async (districtId: any) => {
        await axios.get(process.env.REACT_APP_GHN_API + `ward?district_id=${districtId}`, {
            headers: {
                "Content-Type": "application/json",
                "Token": process.env.REACT_APP_GHN_TOKEN,
            },
        }).then((response) => {
            setWards(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const calculateFee = async (from_district_id: any, from_ward_code: any, to_district_id: any, to_ward_code: any) => {
        await axios.post(process.env.REACT_APP_GHN_FEE_API + "fee", {
            from_district_id: parseInt(from_district_id),
            from_ward_code: from_ward_code,
            to_district_id: parseInt(to_district_id),
            to_ward_code: to_ward_code,
            weight: 200,
            length: 1,
            width: 19,
            height: 10,
            service_id: null,
            service_type_id: 2
        }, {
            headers: {
                "Content-Type": "application/json",
                "Token": process.env.REACT_APP_GHN_TOKEN,
            },
        }).then((response) => {
            setFee(response.data.data.total);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        const getProvinces = async () => {
            await axios.get(process.env.REACT_APP_GHN_API + "province", {
                headers: {
                    "Content-Type": "application/json",
                    "Token": process.env.REACT_APP_GHN_TOKEN,
                },
            }).then((response) => {
                setProvinces(response.data.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        getProvinces();
    }, []);

    const postOrderGHN = async (payment_type: any) => {
        return await axios.post(process.env.REACT_APP_GHN_FEE_API + "create",
            {
                payment_type_id: payment_type === "cod" ? 2 : 1,
                note: note,
                required_note: "KHONGCHOXEMHANG",
                from_name: "Shop2h",
                from_phone: "0373132765",
                to_name: name,
                to_phone: phone,
                to_address: address + ", " + selectedWard.name + ", " + selectedDistrict.name + ", " + selectedProvince.name,
                to_ward_code: selectedWard.id,
                to_district_id: parseInt(selectedDistrict.id),
                content: "Shop 2h - Đơn hàng của bạn",
                weight: 200,
                length: 1,
                width: 19,
                height: 10,
                cod_amount: payment_type === 'cod' ? (fee + cartTotalPrice - (coupon ? coupon.price : 0)) : 0,
                service_id: 0,
                service_type_id: 2,
                pick_shift: [2],
                items: cartItems.map((cartItem: any) => {
                    return {
                        name: cartItem.name + " - Màu: " + cartItem.selectedProductColor + " - Size: " + cartItem.selectedProductSize,
                        code: cartItem.id + "",
                        quantity: cartItem.quantity,
                        price: getDiscountPrice(cartItem.price.price, cartItem.promotions[0]) === null ?
                            cartItem.price.price : getDiscountPrice(cartItem.price.price, cartItem.promotions[0]),
                        category: {
                            level1: cartItem.categories[0].name,
                        }
                    }
                })
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Token": process.env.REACT_APP_GHN_TOKEN,
                    "ShopId": process.env.REACT_APP_GHN_SHOP_ID,
                },
            })
    }

    const handleCreateOrder = () => {
        setIsLoading(true)
        setTimeout(async () => {
            let date = new Date();
            date.setMinutes(date.getMinutes() + 10);
            let unixTimestamp = Math.floor(date.getTime() / 1000);

            let orderDetails = cartItems.map((item: any) => (
                {
                    id: item.id,
                    price: getDiscountPrice(item.price.price, item.promotions[0]) === null ?
                        item.price.price : getDiscountPrice(item.price.price, item.promotions[0]),
                    variation_id: item.variations.find((variation: any) => variation.color === item.selectedProductColor).id,
                    sizes_id: item.variations.find((variation: any) =>
                        variation.color === item.selectedProductColor).sizes.find((size: any) =>
                        size.size === item.selectedProductSize).id,
                    quantity: item.quantity,
                }
            ));
            console.log(orderDetails)
            if (name === "" || phone === "" || address === "" ||
                selectedProvince === null || selectedDistrict === null
                || selectedWard === null) {
                toast.error("Vui lòng nhập đầy đủ thông tin khách hàng")
                setIsLoading(false)
                return;
            }
            let dataCart = {
                id: unixTimestamp,
                name: name,
                phone: phone,
                user_id: userId !== -1 ? userId : null,
                province: selectedProvince.name,
                district: selectedDistrict.name,
                ward: selectedWard.name ? selectedWard.name : "",
                address: address,
                paymentMethod: paymentType,
                paymentCode: "",
                paymentDate: "",
                coupon: coupon ? coupon.couponCode : "",
                paymentStatus: "no",
                shippingFee: fee,
                shippingCode: "",
                totalAmount: cartTotalPrice,
                note: note,
                status: 1,
                orderDetails: orderDetails,
            };
            let shipping_create_status = false;
            switch (paymentType) {
                case 'cod':
                    postOrderGHN(paymentType).then(async (response: any) => {
                        dataCart = {...dataCart, shippingCode: response.data.data.order_code};
                        console.log(dataCart);
                        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}order`, dataCart, {
                            headers: {
                                Accept: 'application/json',
                                "Content-Type": "application/json",
                            },
                            withCredentials: true
                        }).then((response) => {
                            console.log(response.data);
                            deleteAllFromCart(null);
                            toast.success('Đặt hàng thành công!');
                            navigate("/home");
                        }).catch((error) => {
                            toast.error(error.response.data.code_message_value)
                        })
                    }).catch((error) => {
                        toast.error(error.response.data.code_message_value)
                        console.log(error);
                    });
                    break;
                case 'vnpay':
                    const data = {
                        amount: cartTotalPrice + fee - (coupon ? coupon.price : 0),
                        orderInfo: unixTimestamp
                    };
                    await postOrderGHN(paymentType).then(async (response: any) => {
                        dataCart = {...dataCart, shippingCode: response.data.data.order_code};
                        shipping_create_status = true;
                        console.log(response.data);
                    }).catch((error) => {
                        toast.error(error.response.data.code_message_value)
                        console.log(error);
                    });
                    if (shipping_create_status) {
                        const body: any = cartItems.map((cartItem: any) => {
                            return {
                                name: cartItem.name + " - Màu: " + cartItem.selectedProductColor + " - Size: " + cartItem.selectedProductSize,
                                quantity: cartItem.quantity,
                                price: getDiscountPrice(cartItem.price.price, cartItem.promotions[0]) === null ?
                                    cartItem.price.price : getDiscountPrice(cartItem.price.price, cartItem.promotions[0]),
                            }
                        });
                        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}payment/create_payment`, data, {
                            headers: {
                                Accept: 'application/json',
                                "Content-Type": "application/json",
                            },
                            withCredentials: true
                        }).then((response) => {
                            localStorage.setItem("order", JSON.stringify(dataCart));
                            localStorage.setItem("orderbody", JSON.stringify(body));
                            window.location.href = response.data.url;
                        }).catch((error) => {
                            axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel', {
                                order_codes: [dataCart.shippingCode],
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Token": process.env.REACT_APP_GHN_TOKEN,
                                    "ShopId": process.env.REACT_APP_GHN_SHOP_ID,
                                }
                            })
                            console.log(error);
                            toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
                        })
                    }
                    break;
                case 'payos':
                    await postOrderGHN(paymentType).then(async (response: any) => {
                        dataCart = {...dataCart, shippingCode: response.data.data.order_code};
                        shipping_create_status = true;
                        console.log(response.data);
                    }).catch((error) => {
                        toast.error(error.response.data.code_message_value)
                        console.log(error);
                    });
                    if (shipping_create_status) {
                        let amount = cartTotalPrice + fee - (coupon ? coupon.price : 0);
                        let description = "DON HANG " + unixTimestamp;
                        let data_checksum = `amount=${amount}&cancelUrl=${CANCEL_URL}&description=${description}&orderCode=${unixTimestamp}&returnUrl=${RETURN_URL}`;
                        console.log(data_checksum);
                        // Tạo một chữ ký với HMAC_SHA256
                        let checksum_key: any = process.env.REACT_APP_PAYOS_CHECKSUM_KEY;
                        let signature = CryptoJS.HmacSHA256(data_checksum, checksum_key).toString(CryptoJS.enc.Hex);
                        console.log(signature)
                        const body: any = cartItems.map((cartItem: any) => {
                            return {
                                name: cartItem.name + " - Màu: " + cartItem.selectedProductColor + " - Size: " + cartItem.selectedProductSize,
                                quantity: cartItem.quantity,
                                price: getDiscountPrice(cartItem.price.price, cartItem.promotions[0]) === null ?
                                    cartItem.price.price : getDiscountPrice(cartItem.price.price, cartItem.promotions[0]),
                            }
                        });
                        await axios.post('https://api-merchant.payos.vn/v2/payment-requests', {
                            orderCode: unixTimestamp,
                            amount: amount,
                            description: description,
                            buyerName: name,
                            buyerEmail: email,
                            buyerPhone: phone,
                            buyerAddress: address + ", " + selectedWard + ", " + selectedDistrict + ", " + selectedProvince,
                            items: body,
                            cancelUrl: CANCEL_URL,
                            returnUrl: RETURN_URL,
                            expiredAt: unixTimestamp,
                            signature: signature
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                                "x-client-id": process.env.REACT_APP_PAYOS_CLIENT_ID,
                                "x-api-key": process.env.REACT_APP_PAYOS_API_KEY
                            },

                        }).then((response) => {
                            localStorage.setItem("order", JSON.stringify(dataCart));
                            localStorage.setItem("orderbody", JSON.stringify(body));
                            console.log(response)
                            let checkoutResponse = response.data.data;
                            let url = checkoutResponse.checkoutUrl;

                            const eventSource = new EventSource(`${process.env.REACT_APP_API_ENDPOINT}payosse/${unixTimestamp}`, {
                                withCredentials: true,
                            });

                            eventSource.onopen = function (event: any) {
                                console.log(event);
                            }

                            eventSource.onmessage = (event) => {
                                const json = JSON.parse(event.data);
                                if (json.code === '01' || json.code === '00') {
                                    localStorage.setItem("order", JSON.stringify(dataCart));
                                    eventSource.close();
                                    const convertObjectToQueryString = (obj: any) => {
                                        const params = new URLSearchParams();
                                        Object.keys(obj).forEach((key) => {
                                            params.append(key, obj[key]);
                                        });
                                        return params.toString();
                                    };

                                    const queryString = convertObjectToQueryString(json);
                                    window.location.href = '/payment-result-payos?' + queryString;
                                } else {
                                }
                            };

                            eventSource.onerror = function (error) {
                                console.error('EventSource failed:', error);
                                eventSource.close();
                            };

                            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
                            if (newWindow) newWindow.opener = null

                        }).catch((error) => {
                            axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel', {
                                order_codes: [dataCart.shippingCode],
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Token": process.env.REACT_APP_GHN_TOKEN,
                                    "ShopId": process.env.REACT_APP_GHN_SHOP_ID,
                                }
                            })
                            toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau: ", error.response);
                            console.log(error);
                        })
                    }
                    break;
                default:
                    break;
            }
            setIsLoading(false)
        }, 1000)
    }
    return (
        <Fragment>
            <Breadcrumb/>
            <div className="checkout-area pt-95 pb-100">
                <div className="container">
                    {cartItems && cartItems.length >= 1 ? (
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="billing-info-wrap">
                                    <h3>Thông tin khách hàng</h3>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-info mb-20">
                                                <label>Họ tên</label>
                                                <input type="text" required value={name ? name : ""}
                                                       onChange={(e: any) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-info mb-20">
                                                <label>Số điện thoại</label>
                                                <input type="text" required value={phone ? phone : ""}
                                                       onChange={(e: any) => setPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <h4>Địa chỉ</h4>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-select mb-20">
                                                <label>Tỉnh/Thành phố</label>
                                                <select required onChange={
                                                    (e: any) => {
                                                        setSelectedProvince({
                                                            id: e.target.value,
                                                            name: e.target.options[e.target.selectedIndex].text
                                                        });
                                                        getDistricts(e.target.value);
                                                    }
                                                }>
                                                    <option value="">Chọn tỉnh/thành phố</option>
                                                    {provinces && provinces.map((province: any, key: any) => {
                                                        return (
                                                            <option key={key}
                                                                    value={province.ProvinceID}>{province.ProvinceName}</option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-select mb-20">
                                                <label>Quận/Huyện</label>
                                                <select required
                                                        onChange={
                                                            (e: any) => {
                                                                setSelectedDistrict({
                                                                    id: e.target.value,
                                                                    name: e.target.options[e.target.selectedIndex].text
                                                                });
                                                                getWards(e.target.value);
                                                            }
                                                        }
                                                >
                                                    <option value="">Chọn quận/huyện</option>
                                                    {districts && districts.map((district: any, key: any) => {
                                                        return (
                                                            <option key={key}
                                                                    value={district.DistrictID}>{district.DistrictName}</option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-select mb-20">
                                                <label>Phường/Xã</label>
                                                <select required onChange={
                                                    (e: any) => {
                                                        setSelectedWard({
                                                            id: e.target.value,
                                                            name: e.target.options[e.target.selectedIndex].text
                                                        });
                                                        calculateFee(process.env.REACT_APP_GHN_SHOP_DISTRICT_ID, process.env.REACT_APP_GHN_SHOP_WARD_CODE, selectedDistrict.id, e.target.value);
                                                    }
                                                }>
                                                    <option value="">Chọn phường/xã</option>
                                                    {wards && wards.map((ward: any, key: any) => {
                                                        return (
                                                            <option key={key}
                                                                    value={ward.WardCode}>{ward.WardName}</option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 ">
                                            <div className="billing-info mb-20">
                                                <label>Địa chỉ cụ thể</label>
                                                <input type="text" required
                                                       onChange={(e: any) => setAddress(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="additional-info-wrap">
                                        <h4>Thông tin thêm</h4>
                                        <div className="additional-info">
                                            <label>Ghi chú đơn hàng</label>
                                            <textarea
                                                placeholder="Ghi chú đơn hàng của bạn..."
                                                name="message"
                                                defaultValue={""}
                                                onChange={(e: any) => setNote(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-5">
                                <div className="your-order-area">
                                    <h3>Đơn hàng của bạn</h3>
                                    <div className="your-order-wrap gray-bg-4">
                                        <div className="your-order-product-info">
                                            <div className="your-order-top">
                                                <ul>
                                                    <li>Sản phẩm</li>
                                                    <li>Tổng</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-middle">
                                                <ul>
                                                    {cartItems.map((cartItem: any, key: any) => {
                                                        const discountedPrice: any = getDiscountPrice(
                                                            cartItem.price.price,
                                                            cartItem.promotions[0]
                                                        );
                                                        const finalProductPrice = (
                                                            cartItem.price.price
                                                        ).toFixed(0);
                                                        const finalDiscountedPrice: any = (
                                                            discountedPrice === null ? cartItem.price.price : discountedPrice
                                                        ).toFixed(0);

                                                        discountedPrice != null
                                                            ? (cartTotalPrice +=
                                                                finalDiscountedPrice * cartItem.quantity)
                                                            : (cartTotalPrice +=
                                                                finalProductPrice * cartItem.quantity);
                                                        return (
                                                            <li key={key}>
                                                              <span className="order-middle-left">
                                                                {cartItem.name} X {cartItem.quantity}
                                                              </span>{" "}<span className="order-price">
                                                                {formatNumber(discountedPrice !== null ? (
                                                                    finalDiscountedPrice *
                                                                    cartItem.quantity
                                                                ).toFixed(0) : (
                                                                    finalProductPrice * cartItem.quantity
                                                                ).toFixed(0))} đ
                                                              </span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom">
                                                <ul>
                                                    <li className="your-order-shipping">Tạm tính</li>
                                                    <li>{formatNumber(cartTotalPrice.toFixed(0))} đ</li>
                                                </ul>
                                                <ul>
                                                    <li className="your-order-shipping">Phí vận chuyển</li>
                                                    <li>{fee !== 0 && formatNumber(fee.toFixed(0))} đ</li>
                                                </ul>
                                                {coupon ? <>
                                                    <ul>
                                                        <li className="discount-code">Giảm giá</li>
                                                        <li>
                                                            -{formatNumber(coupon.price.toFixed(0)) + " đ"}
                                                        </li>

                                                    </ul>
                                                    <ul style={{paddingTop: '5px'}}>
                                                        <li className="discount-code"></li>
                                                        <li>
                                                            <button className="btn-hover" style={
                                                                {
                                                                    backgroundColor: '#FFFFFF',
                                                                    color: '#000',
                                                                    border: 'none',
                                                                    padding: '5px 10px',
                                                                    fontSize: '14px',
                                                                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                                                                }
                                                            }
                                                                    onClick={() => setCoupon(null)}>Hủy mã giảm giá
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </> : <>
                                                    <ul>
                                                        <li className="discount-code">Mã giảm giá</li>
                                                        <li>
                                                            <input type="text" style={{
                                                                float: 'right',
                                                            }}
                                                                   placeholder={"Nhập mã giảm giá"}
                                                                   onChange={(e: any) => setCouponCode(e.target.value)}/>
                                                        </li>

                                                    </ul>
                                                    <ul style={{paddingTop: '5px'}}>
                                                        <li></li>
                                                        <li>
                                                            {couponCheck ? (
                                                                <button
                                                                    style={
                                                                        {
                                                                            backgroundColor: '#FFFFFF',
                                                                            color: '#000',
                                                                            border: 'none',
                                                                            padding: '5px 10px',
                                                                            fontSize: '14px',
                                                                            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                                                                        }
                                                                    }
                                                                    className="btn-hover d-flex justify-content-center">
                                                                    <ClipLoader color="#36d7b7" size={14}/>
                                                                </button>
                                                            ) : (
                                                                <button className="btn-hover" style={
                                                                    {
                                                                        backgroundColor: '#FFFFFF',
                                                                        color: '#000',
                                                                        border: 'none',
                                                                        padding: '5px 10px',
                                                                        fontSize: '14px',
                                                                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                                                                    }
                                                                }
                                                                        onClick={handleCheckCoupon}>Kiểm tra
                                                                </button>
                                                            )}
                                                        </li>
                                                    </ul>
                                                </>}
                                            </div>
                                            <div className="your-order-total">
                                                <ul>
                                                    <li className="order-total">Tổng tiền</li>
                                                    <li>
                                                        {formatNumber((fee + cartTotalPrice - (coupon ? coupon.price : 0)).toFixed(0)) + " đ"}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="payment-method">
                                            <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label"
                                                           sx={{fontSize: 16, fontWeight: 550}}>
                                                    Phương thức thanh toán
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="cod"
                                                    name="radio-buttons-group"
                                                >
                                                    <FormControlLabel value="cod"
                                                                      onClick={() => setPaymentType('cod')}
                                                                      control={<Radio/>}
                                                                      label={<img style={{maxWidth: '100px'}}
                                                                                  src={'/assets/cod.png'}
                                                                                  alt={'cod'}/>}/>
                                                    <FormControlLabel value="vnpay"
                                                                      onClick={() => setPaymentType('vnpay')}
                                                                      control={<Radio/>}
                                                                      label={<img style={{maxWidth: '100px'}}
                                                                                  src={'/assets/vnpay.png'}
                                                                                  alt={'vnpay'}/>}/>
                                                    <FormControlLabel value="payos"
                                                                      onClick={() => setPaymentType('payos')}
                                                                      control={<Radio/>}
                                                                      label={<img style={{maxWidth: '100px'}}
                                                                                  src={'/assets/payos-logo.png'}
                                                                                  alt={'payos'}/>}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="place-order mt-25">
                                        {
                                            isLoading ? (
                                                <button className="btn-hover d-flex justify-content-center">
                                                    <ClipLoader color="#36d7b7" size={14}/>
                                                </button>
                                            ) : <button className="btn-hover" onClick={handleCreateOrder}>Đặt
                                                hàng
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="item-empty-area text-center">
                                    <div className="item-empty-area__icon mb-30">
                                        <i className="pe-7s-cash"></i>
                                    </div>
                                    <div className="item-empty-area__text">
                                        Hiện không có sản phẩm nào để thanh toán <br/>{" "}
                                        <Link to={"/shop"}>
                                            Mua ngay
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

Checkout.propTypes = {
    cartItems: PropTypes.array,
    currency: PropTypes.object,
    location: PropTypes.object
}

const mapStateToProps = (state: any) => {
    return {
        cartItems: state.cartData
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteAllFromCart: (addToast: any) => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
