import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {connect} from "react-redux";
import {getDiscountPrice} from "../../helpers/product";
import {deleteAllFromWishlist, deleteFromWishlist} from "../../store/actions/wishlistActions";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Wishlist = ({cartItems, wishlistItems, deleteFromWishlist, deleteAllFromWishlist}: any) => {
    const {addToast} = useToasts();

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="cart-main-area pt-90 pb-100">
                <div className="container">
                    {wishlistItems && wishlistItems.length >= 1 ? (
                        <Fragment>
                            <h3 className="cart-page-title">Your wishlist items</h3>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-content table-responsive cart-table-content">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Unit Price</th>
                                                <th>Add To Cart</th>
                                                <th>action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {wishlistItems.map((wishlistItem: any, key: any) => {
                                                const discountedPrice: any = getDiscountPrice(
                                                    wishlistItem.price,
                                                    wishlistItem.discount
                                                );
                                                const finalProductPrice = (
                                                    wishlistItem.price
                                                ).toFixed(2);
                                                const finalDiscountedPrice = (
                                                    discountedPrice
                                                ).toFixed(2);
                                                const cartItem = cartItems.filter(
                                                    (item: any) => item.id === wishlistItem.id
                                                )[0];
                                                return (
                                                    <tr key={key}>
                                                        <td className="product-thumbnail">
                                                            <Link
                                                                to={
                                                                    process.env.PUBLIC_URL +
                                                                    "/product/" +
                                                                    wishlistItem.id
                                                                }
                                                            >
                                                                <img
                                                                    className="img-fluid"
                                                                    src={
                                                                        process.env.PUBLIC_URL +
                                                                        wishlistItem.image[0]
                                                                    }
                                                                    alt=""
                                                                />
                                                            </Link>
                                                        </td>

                                                        <td className="product-name text-center">
                                                            <Link
                                                                to={
                                                                    process.env.PUBLIC_URL +
                                                                    "/product/" +
                                                                    wishlistItem.id
                                                                }
                                                            >
                                                                {wishlistItem.name}
                                                            </Link>
                                                        </td>

                                                        <td className="product-price-cart">
                                                            {discountedPrice !== null ? (
                                                                <Fragment><span
                                                                    className="amount old">{"đ" + finalProductPrice}</span>
                                                                    <span
                                                                        className="amount">{"đ" + finalDiscountedPrice}</span>
                                                                </Fragment>) : (
                                                                <span
                                                                    className="amount">{"đ" + finalProductPrice}</span>
                                                            )}
                                                        </td>

                                                        <td className="product-wishlist-cart">
                                                            {wishlistItem.variation &&
                                                            wishlistItem.variation.length >= 1 ? (
                                                                <Link
                                                                    to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
                                                                >
                                                                    Xem ngay
                                                                </Link>
                                                            ) : wishlistItem.stock &&
                                                            wishlistItem.stock > 0 ? (
                                                                <button
                                                                    className={
                                                                        cartItem !== undefined &&
                                                                        cartItem.quantity > 0
                                                                            ? "active"
                                                                            : ""
                                                                    }
                                                                    disabled={
                                                                        cartItem !== undefined &&
                                                                        cartItem.quantity > 0
                                                                    }
                                                                    title={
                                                                        wishlistItem !== undefined
                                                                            ? "Added to cart"
                                                                            : "Add to cart"
                                                                    }
                                                                >
                                                                    {cartItem !== undefined &&
                                                                    cartItem.quantity > 0
                                                                        ? "Added"
                                                                        : "Add to cart"}
                                                                </button>
                                                            ) : (
                                                                <button disabled className="active">
                                                                    Out of stock
                                                                </button>
                                                            )}
                                                        </td>

                                                        <td className="product-remove">
                                                            <button
                                                                onClick={() =>
                                                                    deleteFromWishlist(wishlistItem, addToast)
                                                                }
                                                            >
                                                                <i className="fa fa-times"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
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
                                            <Link
                                                to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                                            >
                                                Continue Shopping
                                            </Link>
                                        </div>
                                        <div className="cart-clear">
                                            <button onClick={() => deleteAllFromWishlist(addToast)}>
                                                Clear Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="item-empty-area text-center">
                                    <div className="item-empty-area__icon mb-30">
                                        <i className="pe-7s-like"></i>
                                    </div>
                                    <div className="item-empty-area__text">
                                        No items found in wishlist <br/>{" "}
                                        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                                            Add Items
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
        cartItems: state.cartData,
        wishlistItems: state.wishlistData,
        currency: state.currencyData
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteFromWishlist: (item: any, addToast: any) => {
            dispatch(deleteFromWishlist(item, addToast));
        },
        deleteAllFromWishlist: (addToast: any) => {
            dispatch(deleteAllFromWishlist(addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
