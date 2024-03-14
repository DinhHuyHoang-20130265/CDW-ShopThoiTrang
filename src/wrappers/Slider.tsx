import React from "react";
import Swiper from "react-id-swiper";
import SliderSingle from "../components/slider/SliderSingle";

const Slider = () => {

    const sliderData = [
        {
            "id": 1,
            "title": "Smart Products",
            "subtitle": "Winter Offer 2020 Collection",
            "image": "https://en.wikiarquitectura.com/wp-content/uploads/2017/01/Mona-17.jpg",
            "url": "/img1"
        },
        {
            "id": 2,
            "title": "Smart Products",
            "subtitle": "Summer Offer 2020 Collection",
            "image": "https://static.zerochan.net/Mahou.Shoujo.Madoka%E2%98%86Magica.full.512292.jpg",
            "url": "/img2"
        }
    ]

    const params = {
        effect: "fade",
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        watchSlidesVisibility: true,
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
        <div className="slider-area">
            <div className="slider-active nav-style-1">
                <Swiper {...params}>
                    {sliderData &&
                        sliderData.map((single, key): any => {
                            return (
                                <SliderSingle
                                    sliderClassName="swiper-slide"
                                    data={single}
                                    key={key}
                                />
                            );
                        })}
                </Swiper>
            </div>
        </div>
    );
};

export default Slider;
