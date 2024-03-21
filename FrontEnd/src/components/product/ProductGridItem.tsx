import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {getDiscountPrice} from "../../helpers/product";
import ProductRating from "../../wrappers/product/sub-components/ProductRating";
import ProductModal from "../../wrappers/product/ProductModal";

const ProductGridItem = ({
                             product,
                             addToCart,
                             addToWishlist,
                             cartItem,
                             wishlistItem,
                             sliderClassName,
                             spaceBottomClass
                         }: any) => {
    const [modalShow, setModalShow] = useState(false);
    const {addToast} = useToasts();

    const discountedPrice = getDiscountPrice(product.price, product.discount);
    const finalProductPrice = (product.price).toFixed(2);
    const finalDiscountedPrice = discountedPrice !== null ? +(discountedPrice).toFixed(2) : 0;

    return (
        <Fragment>
            <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ""}`}>
                <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}>
                    <div className="product-img">
                        <Link to={"/product/" + product.id}>
                            <img className="default-img"
                                 src={product.image[0]}
                                 alt=""/>
                            {product.image.length > 1 ? (
                                <img className="hover-img" src={product.image[1]} alt=""/>) : ("")}
                        </Link>
                        {product.discount || product.new ? (
                            <div className="product-img-badges">
                                {product.discount ? (
                                    <span className="pink">-{product.discount}%</span>
                                ) : (
                                    ""
                                )}
                                {product.new ? <span className="purple">New</span> : ""}
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="product-action">
                            <div className="pro-same-action pro-wishlist">
                                <button
                                    className={wishlistItem !== undefined ? "active" : ""}
                                    disabled={wishlistItem !== undefined}
                                    title={
                                        wishlistItem !== undefined
                                            ? "Added to wishlist"
                                            : "Add to wishlist"
                                    }
                                    onClick={() => addToWishlist(product, addToast)}
                                >
                                    <i className="pe-7s-like"/>
                                </button>
                            </div>
                            <div className="pro-same-action pro-cart">
                                {product.variation && product.variation.length >= 1 ? (
                                    <Link to={`/product/${product.id}`}>
                                        Xem ngay
                                    </Link>
                                ) : product.stock && product.stock > 0 ? (
                                    <button
                                        onClick={() => addToCart(product, addToast)}
                                        className={
                                            cartItem !== undefined && cartItem.quantity > 0
                                                ? "active"
                                                : ""
                                        }
                                        disabled={cartItem !== undefined && cartItem.quantity > 0}
                                        title={
                                            cartItem !== undefined ? "Added to cart" : "Add to cart"
                                        }
                                    >
                                        {" "}
                                        <i className="pe-7s-cart"></i>{" "}
                                        {cartItem !== undefined && cartItem.quantity > 0
                                            ? "Added"
                                            : "Add to cart"}
                                    </button>
                                ) : (
                                    <button disabled className="active">
                                        Out of Stock
                                    </button>
                                )}
                            </div>
                            <div className="pro-same-action pro-quickview">
                                <button onClick={() => setModalShow(true)} title="Quick View">
                                    <i className="pe-7s-look"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="product-content text-center">
                        <h3>
                            <Link to={"/product/" + product.id}>
                                {product.name}
                            </Link>
                        </h3>
                        {product.rating && product.rating > 0 ? (
                            <div className="product-rating">
                                <ProductRating ratingValue={product.rating}/>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="product-price">
                            {discountedPrice !== null ? (
                                <Fragment>
                                    <span>{"đ" + finalDiscountedPrice}</span>{" "}
                                    <span className="old">
                    {"đ" + finalProductPrice}
                  </span>
                                </Fragment>
                            ) : (
                                <span>{"đ" + finalProductPrice} </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* product modal */}
            <ProductModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                discountedprice={discountedPrice}
                finalproductprice={finalProductPrice}
                finaldiscountedprice={finalDiscountedPrice}
                cartitem={cartItem}
                wishlistitem={wishlistItem}
                addtocart={addToCart}
                addtowishlist={addToWishlist}
                addtoast={addToast}
            />
        </Fragment>
    );
};

export default ProductGridItem;
