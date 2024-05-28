import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {formatCurrency, getDiscountPrice} from "../../../helpers/product";

const MenuCart = ({cartData, deleteFromCart}: any) => {
    let cartTotalPrice = 0;
    const {addToast} = useToasts();
    return (
        <div className="shopping-cart-content">
            {cartData && cartData.length > 0 ? (
                <Fragment>
                    <ul>
                        {cartData.map((single: any, key: any) => {
                            const discountedPrice: any = getDiscountPrice(
                                single.price.price,
                                single.promotions[0]
                            );
                            const finalProductPrice = (
                                single.price.price
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                                discountedPrice === null ? single.price.price : discountedPrice
                            ).toFixed(2);

                            discountedPrice != null
                                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                                : (cartTotalPrice += finalProductPrice * single.quantity);

                            return (
                                <li className="single-shopping-cart" key={key}>
                                    <div className="shopping-cart-img">
                                        <Link to={"/product/" + single.id}>
                                            <img
                                                alt=""
                                                src={single.imageUrl}
                                                className="img-fluid"
                                            />
                                        </Link>
                                    </div>
                                    <div className="shopping-cart-title">
                                        <h4>
                                            <Link
                                                to={"/product/" + single.id}
                                            >
                                                {" "}
                                                {single.name}{" "}
                                            </Link>
                                        </h4>
                                        <h6>Số lượng: {single.quantity}</h6>
                                        <span>
                      {discountedPrice !== null
                          ? formatCurrency(finalDiscountedPrice)
                          : formatCurrency(finalProductPrice)}
                    </span>
                                        {single.selectedProductColor &&
                                        single.selectedProductSize ? (
                                            <div className="cart-item-variation">
                                                <span>Màu: {single.selectedProductColor}</span>
                                                <span>Kích thước: {single.selectedProductSize}</span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="shopping-cart-delete">
                                        <button onClick={() => deleteFromCart(single, addToast)}>
                                            <i className="fa fa-times-circle"/>
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="shopping-cart-total">
                        <h4>
                            Tổng :{" "}
                            <span className="shop-total">
                {formatCurrency(cartTotalPrice)}
              </span>
                        </h4>
                    </div>
                    <div className="shopping-cart-btn btn-hover text-center">
                        <Link className="default-btn" to={"/cart"}>
                            Xem giỏ hàng
                        </Link>
                        <Link
                            className="default-btn"
                            to={"/checkout"}
                        >
                            Thanh toán
                        </Link>
                    </div>
                </Fragment>
            ) : (
                <p className="text-center">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            )}
        </div>
    );
};

MenuCart.propTypes = {
    cartData: PropTypes.array,
    deleteFromCart: PropTypes.func
};

export default MenuCart;
