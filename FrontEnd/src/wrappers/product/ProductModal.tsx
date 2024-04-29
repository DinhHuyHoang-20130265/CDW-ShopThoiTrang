import React, {Fragment, useEffect, useState} from "react";
import Swiper from "react-id-swiper";
import {getProductCartQuantity} from "../../helpers/product";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import ProductRating from "./sub-components/ProductRating";

function ProductModal(props: any) {
    const {product} = props;
    const {discountedprice} = props;
    const {finalproductprice} = props;
    const {finaldiscountedprice} = props;
    const [gallerySwiper, getGallerySwiper]: any = useState(null);
    const [thumbnailSwiper, getThumbnailSwiper]: any = useState(null);
    const [selectedProductColor, setSelectedProductColor] = useState(
        product.variations ? product.variations[0].color : ""
    );
    const [selectedProductSize, setSelectedProductSize] = useState(
        product.variations ? product.variations[0].sizes[0].size : ""
    );
    const [productStock, setProductStock] = useState(
        product.variations ? product.variations[0].sizes[0].stock : 0
    );
    const [quantityCount, setQuantityCount] = useState(1);

    const wishlistItem = props.wishlistitem;

    const addToCart = props.addtocart;
    const addToWishlist = props.addtowishlist;

    const addToast = props.addtoast;
    const cartItems = props.cartitems;
    const productCartQty = getProductCartQuantity(
        cartItems,
        product,
        selectedProductColor,
        selectedProductSize
    );

    useEffect(() => {
        if (product.imgProducts.find((item: any) => item.url === product.imageUrl) === undefined)
            product.imgProducts.push({url: product.imageUrl});
    }, [product]);

    useEffect(() => {
        if (
            gallerySwiper !== null && gallerySwiper.controller &&
            thumbnailSwiper !== null && thumbnailSwiper.controller
        ) {
            gallerySwiper.controller.control = thumbnailSwiper;
            thumbnailSwiper.controller.control = gallerySwiper;
        }
    }, [gallerySwiper, thumbnailSwiper]);

    const gallerySwiperParams = {
        getSwiper: getGallerySwiper,
        spaceBetween: 10,
        loopedSlides: product.imgProducts.length,
        loop: product.imgProducts.length > 3,
    };

    const thumbnailSwiperParams = {
        getSwiper: getThumbnailSwiper,
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        freeMode: true,
        loopedSlides: product.imgProducts.length,
        loop: product.imgProducts.length > 3,
        slideToClickedSlide: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        renderPrevButton: () => (
            <button className="swiper-button-prev ht-swiper-button-nav">
                <i className="pe-7s-angle-left"/>
            </button>
        ),
        renderNextButton: () => (
            <button className="swiper-button-next ht-swiper-button-nav">
                <i className="pe-7s-angle-right"/>
            </button>
        )
    };

    return (
        <Fragment>
            <Modal key={props.key} show={props.show} onHide={props.onHide} className="product-quickview-modal-wrapper">
                <Modal.Header closeButton/>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <div className="product-large-image-wrapper">
                                <Swiper {...gallerySwiperParams} >
                                    {
                                        product.imgProducts.map((single: any, key: any) => {
                                            return (
                                                <div className={'abc'} key={key}>
                                                    <div className="single-image" style={{minHeight: "325px"}}>
                                                        <img
                                                            src={single.url}
                                                            className="img-fluid"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </Swiper>
                            </div>
                            <div className="product-small-image-wrapper mt-15">
                                <Swiper {...thumbnailSwiperParams}>
                                    {
                                        product.imgProducts.map((single: any, key: any) => {
                                            return (
                                                <div key={key}>
                                                    <div className="single-image">
                                                        <img
                                                            src={single.url}
                                                            className="img-fluid"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </Swiper>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12 col-xs-12">
                            <div className="product-details-content quickview-content">
                                <h2>{product.name}</h2>
                                <div className="product-details-price">
                                    {discountedprice !== null ? (
                                        <Fragment>
                                            <span>{"đ" + finaldiscountedprice}</span>
                                            {" "}
                                            <span className="old">{"đ" + finalproductprice}</span>
                                        </Fragment>
                                    ) : (
                                        <span>{"đ" + finalproductprice} </span>
                                    )}
                                </div>

                                <div className="pro-details-rating-wrap">
                                    <div className="pro-details-rating">
                                        <ProductRating ratingValue={product.rating}/>
                                    </div>
                                </div>
                                <div className="pro-details-list">
                                    <p>{product.description}</p>
                                </div>

                                {product.variations ? (
                                    <div className="pro-details-size-color">
                                        <div className="pro-details-color-wrap">
                                            <span>Màu</span>
                                            <div className="pro-details-color-content">
                                                {product.variations && product.variations.map((single: any, key: any) => {
                                                    return (
                                                        <label
                                                            className={`pro-details-color-content--single ${single.color}`}
                                                            key={key}
                                                        >
                                                            <input
                                                                type="radio"
                                                                value={single.color}
                                                                name="product-color"
                                                                // @ts-ignore
                                                                checked={
                                                                    single.color === selectedProductColor ? "checked" : ""
                                                                }
                                                                onChange={() => {
                                                                    setSelectedProductColor(single.color);
                                                                    setSelectedProductSize(single.sizes[0].size);
                                                                    setProductStock(single.sizes[0].stock);
                                                                    setQuantityCount(1);
                                                                }}
                                                            />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="pro-details-size">
                                            <span>Kích thước</span>
                                            <div className="pro-details-size-content">
                                                {product.variations &&
                                                    product.variations.map((single: any) => {
                                                        return single.color === selectedProductColor
                                                            ? single.sizes.map((singleSize: any, key: any) => {
                                                                return (
                                                                    <label
                                                                        className={`pro-details-size-content--single`}
                                                                        key={key}
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            value={singleSize.size}
                                                                            // @ts-ignore
                                                                            checked={
                                                                                (singleSize.size === selectedProductSize) ? "checked" : ""
                                                                            }
                                                                            onChange={() => {
                                                                                setSelectedProductSize(
                                                                                    singleSize.size
                                                                                );
                                                                                setProductStock(singleSize.stock);
                                                                                setQuantityCount(1);
                                                                            }}
                                                                        />
                                                                        <span className="size-name">{singleSize.size}
                                                                        </span>
                                                                    </label>
                                                                );
                                                            })
                                                            : "";
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {product.affiliateLink ? (
                                    <div className="pro-details-quality">
                                        <div className="pro-details-cart btn-hover">
                                            <a href={product.affiliateLink}
                                               rel="noopener noreferrer"
                                               target="_blank">
                                                Buy Now
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pro-details-quality">
                                        <div className="cart-plus-minus">
                                            <button
                                                onClick={() =>
                                                    setQuantityCount(
                                                        quantityCount > 1 ? quantityCount - 1 : 1
                                                    )
                                                }
                                                className="dec qtybutton"
                                            >
                                                -
                                            </button>
                                            <input
                                                className="cart-plus-minus-box"
                                                type="text"
                                                value={quantityCount}
                                                readOnly
                                            />
                                            <button
                                                onClick={() =>
                                                    setQuantityCount(
                                                        quantityCount < productStock - productCartQty
                                                            ? quantityCount + 1
                                                            : quantityCount
                                                    )
                                                }
                                                className="inc qtybutton"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="pro-details-cart btn-hover">
                                            {productStock && productStock > 0 ? (
                                                <button
                                                    onClick={() =>
                                                        addToCart(
                                                            product,
                                                            addToast,
                                                            quantityCount,
                                                            selectedProductColor,
                                                            selectedProductSize
                                                        )
                                                    }
                                                    disabled={productCartQty >= productStock}
                                                >
                                                    {" "}
                                                    Add To Cart{" "}
                                                </button>
                                            ) : (
                                                <button disabled>Out of Stock</button>
                                            )}
                                        </div>
                                        <div className="pro-details-wishlist">
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
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
}

const mapStateToProps = (state: { cartData: any; }) => {
    return {
        cartitems: state.cartData
    };
};

export default connect(mapStateToProps)(ProductModal);
