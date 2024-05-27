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

    const discountedPrice = getDiscountPrice(product.price.price, product.promotions[0])
    const finalProductPrice = (product.price.price).toFixed(2);
    const finalDiscountedPrice = discountedPrice !== null ? (discountedPrice).toFixed(2) : 0;

    return (
        <Fragment>
            <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ""}`}>
                <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}>
                    <div className="product-img">
                        <Link to={"/product/" + product.id}>
                            <img
                                className="default-img"
                                src={product.imageUrl}
                                alt=""
                            />
                            {product.imgProducts.length > 0 ? (
                                <img
                                    className="hover-img"
                                    src={product.imgProducts[0]}
                                    alt=""
                                />
                            ) : (
                                ""
                            )}
                        </Link>
                        {product.promotions.length > 0 || product.variations ? (
                            <div className="product-img-badges">
                                {product.promotions.length > 0 && product.promotions[0].discount ? (
                                    <span className="pink">-{product.promotions[0].discount}%</span>
                                ) : (
                                    ""
                                )}
                                {product.variations ? <span className="purple">Còn hàng</span> : ""}
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
                                            ? "Đã thêm vào yêu thích"
                                            : "Thêm vào yêu thích"
                                    }
                                    onClick={() => addToWishlist(product, addToast)}
                                >
                                    <i className="pe-7s-like"/>
                                </button>
                            </div>
                            <div className="pro-same-action pro-cart">
                                {product.variations && product.variations.length >= 1 ? (
                                    <Link to={`/product/${product.id}`}>
                                        Xem ngay
                                    </Link>
                                ) : product.variations && product.variations.sizes && product.variations.sizes > 0 ? (
                                    <button
                                        onClick={() => addToCart(product, addToast)}
                                        className={
                                            cartItem !== undefined && cartItem.quantity > 0
                                                ? "active"
                                                : ""
                                        }
                                        disabled={cartItem !== undefined && cartItem.quantity > 0}
                                        title={
                                            cartItem !== undefined ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"
                                        }
                                    >
                                        {" "}
                                        <i className="pe-7s-cart"></i>{" "}
                                        {cartItem !== undefined && cartItem.quantity > 0
                                            ? "Đã thêm vào giỏ hàng"
                                            : "Thêm vào giỏ hàng"}
                                    </button>
                                ) : (
                                    <button disabled className="active">
                                        Hết Hàng
                                    </button>
                                )}
                            </div>
                            <div className="pro-same-action pro-quickview">
                                <button onClick={() => setModalShow(true)} title="Xem nhanh">
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
                        {/*{product.rating && product.rating > 0 ? (*/}
                        {/*    <div className="product-rating">*/}
                        {/*        <ProductRating ratingValue={product.rating}/>*/}
                        {/*    </div>*/}
                        {/*) : (*/}
                        {/*    ""*/}
                        {/*)}*/}
                        <div className="product-price">
                            {discountedPrice !== null ? (
                                <Fragment>
                                    <span>{"đ" + finalDiscountedPrice}</span>{" "}
                                    <span className="old">{"đ" + finalProductPrice}</span>
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
                key={product.id}
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
