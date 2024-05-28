import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {connect} from "react-redux";
import {formatCurrency, getDiscountPrice} from "../../helpers/product";
import {
    addToCart,
    decreaseQuantity,
    deleteFromCart,
    cartItemStock,
    deleteAllFromCart
} from "../../store/actions/cartActions";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const ShoppingCart = ({
                          cartItems,
                          decreaseQuantity,
                          addToCart,
                          deleteFromCart,
                          deleteAllFromCart
                      }: any) => {
    const [quantityCount] = useState(1);
    const {addToast} = useToasts();
    let cartTotalPrice = 0;

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="cart-main-area pt-90 pb-100">
                <div className="container">
                    {cartItems && cartItems.length >= 1 ? (
                        <Fragment>
                            <h3 className="cart-page-title">Giỏ hàng</h3>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-content table-responsive cart-table-content">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>Sản phẩm</th>
                                                <th>Đơn giá</th>
                                                <th>Số lượng</th>
                                                <th>Tổng</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {cartItems.map((cartItem: any, key: any) => {
                                                const discountedPrice: any = getDiscountPrice(
                                                    cartItem.price.price,
                                                    cartItem.promotions[0]
                                                );
                                                const finalProductPrice = (
                                                    cartItem.price.price
                                                ).toFixed(2);
                                                const finalDiscountedPrice = (
                                                    discountedPrice === null ? cartItem.price.price : discountedPrice
                                                ).toFixed(2);

                                                discountedPrice != null
                                                    ? (cartTotalPrice +=
                                                        finalDiscountedPrice * cartItem.quantity)
                                                    : (cartTotalPrice +=
                                                        finalProductPrice * cartItem.quantity);
                                                return (cartItem ?
                                                        <tr key={key}>
                                                            <td className="product-thumbnail">
                                                                <Link to={"/product/" + cartItem.id}>
                                                                    <img className="img-fluid" src={cartItem.imageUrl}
                                                                         alt=""/>
                                                                </Link>
                                                            </td>

                                                            <td className="product-name">
                                                                <Link
                                                                    to={"/product/" + cartItem.id}>
                                                                    {cartItem.name}
                                                                </Link>
                                                                {cartItem.selectedProductColor &&
                                                                cartItem.selectedProductSize ? (
                                                                    <div className="cart-item-variation">
                                                                    <span>
                                                                    Color: {cartItem.selectedProductColor}
                                                                    </span>
                                                                        <span>
                                                                        Size: {cartItem.selectedProductSize}
                                                                    </span>
                                                                    </div>) : ("")}
                                                            </td>

                                                            <td className="product-price-cart">
                                                                {discountedPrice !== null ? (
                                                                    <Fragment>
                                                                    <span className="amount old">
                                                                        {formatCurrency(finalProductPrice)}
                                                                    </span>
                                                                        <span className="amount">
                                                                        {formatCurrency(finalDiscountedPrice)}
                                                                    </span>
                                                                    </Fragment>) : (
                                                                    <span className="amount">
                                                                    {formatCurrency(finalProductPrice)}
                                                                </span>)}
                                                            </td>

                                                            <td className="product-quantity">
                                                                <div className="cart-plus-minus">
                                                                    <button className="dec qtybutton"
                                                                            onClick={() => cartItem && decreaseQuantity(cartItem, addToast)}>
                                                                        -
                                                                    </button>
                                                                    <input
                                                                        className="cart-plus-minus-box"
                                                                        type="text"
                                                                        value={cartItem.quantity}
                                                                        readOnly
                                                                    />
                                                                    <button
                                                                        className="inc qtybutton"
                                                                        onClick={() => cartItem &&
                                                                            addToCart(
                                                                                cartItem,
                                                                                addToast,
                                                                                quantityCount
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            cartItem !== undefined &&
                                                                            cartItem.quantity &&
                                                                            cartItem.quantity >
                                                                            cartItemStock(
                                                                                cartItem,
                                                                                cartItem.selectedProductColor,
                                                                                cartItem.selectedProductSize
                                                                            )
                                                                        }
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="product-subtotal">
                                                                {discountedPrice !== null
                                                                    ? formatCurrency(finalDiscountedPrice * cartItem.quantity) : formatCurrency(finalProductPrice * cartItem.quantity)}
                                                            </td>

                                                            <td className="product-remove">
                                                                <button onClick={() =>
                                                                    cartItem && deleteFromCart(cartItem, addToast)
                                                                }>
                                                                    <i className="fa fa-times"></i>
                                                                </button>
                                                            </td>
                                                        </tr> : <></>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cart-shiping-update-wrapper">
                                        <div className="cart-shiping-update">
                                            <Link to={"/shop"}>
                                                Tiếp tục mua hàng
                                            </Link>
                                        </div>
                                        <div className="cart-clear">
                                            <button onClick={() => deleteAllFromCart(addToast)}>
                                                Xoá toàn bộ giỏ hàng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="discount-code-wrapper">
                                        <div className="title-wrap">
                                            <h4 className="cart-bottom-title section-bg-gray">
                                                Áp dụng mã giảm giá
                                            </h4>
                                        </div>
                                        <div className="discount-code">
                                            <p>Nhâp mã giảm giá tại đây</p>
                                            <form>
                                                <input type="text" required name="name"/>
                                                <button className="cart-btn-2" type="submit">
                                                    Áp dụng
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="grand-totall">
                                        <div className="title-wrap">
                                            <h4 className="cart-bottom-title section-bg-gary-cart">
                                                Tổng tiền
                                            </h4>
                                        </div>
                                        <h5>
                                            Tạm tính{" "}
                                            <span>
                                                {formatCurrency(cartTotalPrice)}
                                            </span>
                                        </h5>

                                        <h4 className="grand-totall-title">
                                            Tổng tiền{" "}
                                            <span>
                                                {formatCurrency(cartTotalPrice)}
                                            </span>
                                        </h4>
                                        <Link to={"/checkout"}>
                                            Thanh toán
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="item-empty-area text-center">
                                    <div className="item-empty-area__icon mb-30">
                                        <i className="pe-7s-cart"></i>
                                    </div>
                                    <div className="item-empty-area__text">
                                        No items found in cart <br/>{" "}
                                        <Link to={process.env.PUBLIC_URL + "/shop"}>
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

const mapStateToProps = (state: any) => {
    return {
        cartItems: state.cartData
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addToCart: (item: any, addToast: any, quantityCount: any) => {
            dispatch(addToCart(item, addToast, quantityCount, item.selectedProductColor, item.selectedProductSize));
        },
        decreaseQuantity: (item: any, addToast: any) => {
            dispatch(decreaseQuantity(item, addToast));
        },
        deleteFromCart: (item: any, addToast: any) => {
            dispatch(deleteFromCart(item, addToast));
        },
        deleteAllFromCart: (addToast: any) => {
            dispatch(deleteAllFromCart(addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
