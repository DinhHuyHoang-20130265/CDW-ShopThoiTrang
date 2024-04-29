import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getDiscountPrice} from "../../helpers/product";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Checkout = ({cartItems}: any) => {
    let cartTotalPrice = 0;

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
                                                <input type="text"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-info mb-20">
                                                <label>Số điện thoại</label>
                                                <input type="text"/>
                                            </div>
                                        </div>
                                        <h4>Địa chỉ</h4>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-select mb-20">
                                                <label>Tỉnh/Thành phố</label>
                                                <select>
                                                    <option>Chọn tỉnh/thành phố</option>
                                                    <option>Azerbaijan</option>
                                                    <option>Bahamas</option>
                                                    <option>Bahrain</option>
                                                    <option>Bangladesh</option>
                                                    <option>Barbados</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-select mb-20">
                                                <label>Quận/Huyện</label>
                                                <select>
                                                    <option>Chọn quận/huyện</option>
                                                    <option>Azerbaijan</option>
                                                    <option>Bahamas</option>
                                                    <option>Bahrain</option>
                                                    <option>Bangladesh</option>
                                                    <option>Barbados</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="billing-select mb-20">
                                                <label>Phường/Xã</label>
                                                <select>
                                                    <option>Chon phường/xã</option>
                                                    <option>Azerbaijan</option>
                                                    <option>Bahamas</option>
                                                    <option>Bahrain</option>
                                                    <option>Bangladesh</option>
                                                    <option>Barbados</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 ">
                                            <div className="billing-info mb-20">
                                                <label>Địa chỉ cụ thể</label>
                                                <input type="text"/>
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
                                  </span>{" "}
                                                                <span className="order-price">
                                    {discountedPrice !== null
                                        ? "đ" +
                                        (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                        ).toFixed(2)
                                        : "đ" +
                                        (
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
                                                    <li>Free shipping</li>
                                                </ul>
                                                <ul>
                                                    <li className="your-order-shipping">Mã giảm giá</li>
                                                    <li>Free shipping</li>
                                                </ul>
                                                <ul>
                                                    <li className="your-order-shipping">Phí vận chuyển</li>
                                                    <li>Free shipping</li>
                                                </ul>
                                            </div>
                                            <div className="your-order-total">
                                                <ul>
                                                    <li className="order-total">Tổng tiền</li>
                                                    <li>
                                                        {"đ" +
                                                            cartTotalPrice.toFixed(2)}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="payment-method"></div>
                                    </div>
                                    <div className="place-order mt-25">
                                        <button className="btn-hover">Đặt hàng</button>
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
    );
};

Checkout.propTypes = {
    cartItems: PropTypes.array,
    currency: PropTypes.object,
    location: PropTypes.object
};

const mapStateToProps = (state: any) => {
    return {
        cartItems: state.cartData
    };
};

export default connect(mapStateToProps)(Checkout);
