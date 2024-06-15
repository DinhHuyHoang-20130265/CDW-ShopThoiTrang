import React, {Fragment, useEffect, useState} from "react";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";

// @ts-ignore
import {LightgalleryProvider, LightgalleryItem} from "react-lightgallery";


const ProductImageGalleryLeftThumb = ({product, thumbPosition}: any) => {
    const [gallerySwiper, getGallerySwiper]: any = useState(null);
    const [thumbnailSwiper, getThumbnailSwiper]: any = useState(null);
    useEffect(() => {
        if (
            gallerySwiper !== null &&
            gallerySwiper.controller &&
            thumbnailSwiper !== null &&
            thumbnailSwiper.controller
        ) {
            gallerySwiper.controller.control = thumbnailSwiper;
            thumbnailSwiper.controller.control = gallerySwiper;
        }
    }, [gallerySwiper, thumbnailSwiper]);

    // swiper slider settings
    const gallerySwiperParams = {
        getSwiper: getGallerySwiper,
        spaceBetween: 10,
        loopedSlides: product.imgProducts.length,
        loop: product.imgProducts.length > 3,
        slideToClickedSlide: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        renderPrevButton: () => (
            <button className="swiper-button-prev ht-swiper-button-nav" style={{borderRadius: "15%"}}>
                <i className="pe-7s-angle-left"/>
            </button>
        ),
        renderNextButton: () => (
            <button className="swiper-button-next ht-swiper-button-nav" style={{borderRadius: "15%"}}>
                <i className="pe-7s-angle-right"/>
            </button>
        )
    };

    const thumbnailSwiperParams = {
        getSwiper: getThumbnailSwiper,
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loopedSlides: product.imgProducts.length,
        loop: product.imgProducts.length > 3,
        slideToClickedSlide: true,
        direction: "vertical",

        breakpoints: {
            1200: {
                slidesPerView: 4,
                direction: "vertical"
            },
            992: {
                slidesPerView: 4,
                direction: "horizontal"
            },
            768: {
                slidesPerView: 4,
                direction: "horizontal"
            },
            640: {
                slidesPerView: 4,
                direction: "horizontal"
            },
            320: {
                slidesPerView: 4,
                direction: "horizontal"
            }
        }
    };

    return (
        <Fragment>
            <div className="row row-5">
                <div
                    className={` ${
                        thumbPosition && thumbPosition === "left"
                            ? "col-xl-10 order-1 order-xl-2"
                            : "col-xl-10"
                    }`}
                >
                    <div className="product-large-image-wrapper">
                        {product.promotions[0] ? (
                            <div className="product-img-badges">
                                {product.promotions[0] ? (
                                    <span className="pink">-{product.promotions[0].discount}%</span>) : (
                                    ""
                                )}
                                {product.variations ? <span className="purple">Còn hàng</span> : ""}
                            </div>) : ("")}
                        <LightgalleryProvider>
                            <Swiper {...gallerySwiperParams}>
                                {product.imgProducts.map((single: any, key: any) => {
                                    return (
                                        <div key={key}>
                                            <LightgalleryItem
                                                group="any"
                                                src={single.url}
                                            >
                                                <button>
                                                    <i className="pe-7s-expand1"></i>
                                                </button>
                                            </LightgalleryItem>
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
                        </LightgalleryProvider>
                    </div>
                </div>
                <div className={` ${
                    thumbPosition && thumbPosition === "left" ? "col-xl-2 order-2 order-xl-1" : "col-xl-2"}`}>
                    <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
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
            </div>
        </Fragment>
    );
};

ProductImageGalleryLeftThumb.propTypes = {
    product: PropTypes.object,
    thumbPosition: PropTypes.string
};

export default ProductImageGalleryLeftThumb;
