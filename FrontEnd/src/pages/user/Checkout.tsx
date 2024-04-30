import React, {Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getDiscountPrice} from "../../helpers/product";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {FormControl, FormControlLabel, FormLabel} from "@mui/material";
import toast from "react-hot-toast";
import {ClipLoader} from "react-spinners";

const Checkout = ({cartItems}: any) => {
    let cartTotalPrice = 0;
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict]: any = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");

    const [fee, setFee] = useState(0);
    const [paymentType, setPaymentType] = useState('cod');
    const [isLoading, setIsLoading]: any = useState(false);

    useEffect(() => {
        console.log(isLoading)
    }, [isLoading]);

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
            console.log(response.data)
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
                payment_type_id: 1,
                note: note,
                required_note: "KHONGCHOXEMHANG",
                from_name: "Shop2h",
                from_phone: "0373132765",
                to_name: name,
                to_phone: phone,
                to_address: address + ", " + selectedWard + ", " + selectedDistrict + ", " + selectedProvince,
                to_ward_code: selectedWard,
                to_district_id: parseInt(selectedDistrict),
                content: "Shop 2h - Đơn hàng của bạn",
                weight: 200,
                length: 1,
                width: 19,
                height: 10,
                cod_amount: payment_type === 'cod' ? (fee + cartTotalPrice) : 0,
                service_id: 0,
                service_type_id: 2,
                pick_shift: [2],
                items: cartItems.map((cartItem: any) => {
                    return {
                        name: cartItem.name + " - Màu: " + cartItem.selectedProductColor + " - Size: " + cartItem.selectedProductSize,
                        code: cartItem.id + "",
                        quantity: cartItem.quantity,
                        price: getDiscountPrice(cartItem.price.price, cartItem.promotions[0]) != null ?
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
        if (name === "" || phone === "" || address === "" ||
            selectedProvince === null || selectedProvince === "" || selectedDistrict === null
            || selectedDistrict === "" || selectedWard === null || selectedWard === "") {
            toast.error("Vui lòng nhập đầy đủ thông tin khách hàng")
            setIsLoading(false)
            return;
        }
        switch (paymentType) {
            case 'cod':
                // postOrderGHN('cod').then((response: any) => {
                //     console.log(response.data);
                //     toast.success('Đặt hàng thành công!');
                // }).catch((error) => {
                //     toast.error(error.response.data.code_message_value)
                //     console.log(error);
                // });

                break;
            case 'vnpay':

                break;
            case 'payos':
            default:
                break;
        }
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
                                                <input type="text" required
                                                       onChange={(e: any) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-info mb-20">
                                                <label>Số điện thoại</label>
                                                <input type="text" required
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
                                                        setSelectedProvince(e.target.value);
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
                                                                setSelectedDistrict(e.target.value);
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
                                                        setSelectedWard(e.target.value);
                                                        calculateFee(process.env.REACT_APP_GHN_SHOP_DISTRICT_ID, process.env.REACT_APP_GHN_SHOP_WARD_CODE, selectedDistrict, e.target.value);
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
                                                        ).toFixed(2);
                                                        const finalDiscountedPrice: any = (
                                                            discountedPrice === null ? cartItem.price.price : discountedPrice
                                                        ).toFixed(2);

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
                                                                {discountedPrice !== null ? "đ" + (
                                                                    finalDiscountedPrice *
                                                                    cartItem.quantity
                                                                ).toFixed(2) : "đ" + (
                                                                    finalProductPrice * cartItem.quantity
                                                                ).toFixed(2)}
                                                              </span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="your-order-bottom">
                                                <ul>
                                                    <li className="your-order-shipping">Tạm tính</li>
                                                    <li>{"đ" + cartTotalPrice.toFixed(2)}</li>
                                                </ul>
                                                <ul>
                                                    <li className="your-order-shipping">Mã giảm giá</li>
                                                    <li></li>
                                                </ul>
                                                <ul>
                                                    <li className="your-order-shipping">Phí vận chuyển</li>
                                                    <li>{fee !== 0 && fee.toFixed(2)} đ</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-total">
                                                <ul>
                                                    <li className="order-total">Tổng tiền</li>
                                                    <li>
                                                        {"đ" + (fee + cartTotalPrice).toFixed(2)}
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
                                                <div className="btn-hover d-flex justify-content-center">
                                                    <ClipLoader color="#36d7b7"/>
                                                </div>
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

export default connect(mapStateToProps)(Checkout)
