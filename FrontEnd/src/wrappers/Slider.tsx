import React from "react";
import Swiper from "react-id-swiper";
import SliderSingle from "../components/slider/SliderSingle";

const Slider = () => {

    const sliderData = [
        {
            "id": 1,
            "title": "Bộ sưu tập mùa đông 2020",
            "subtitle": "Bộ sưu tập mùa đông 2020",
            "image": "https://i.pinimg.com/originals/98/bd/a1/98bda1939fee82d91a6d925a6934eb32.png",
            "url": "https://i.pinimg.com/originals/98/bd/a1/98bda1939fee82d91a6d925a6934eb32.png"
        },
        {
            "id": 2,
            "title": "Bộ sưu tập mùa hè 2020",
            "subtitle": "Bộ sưu tập mùa hè 2020",
            "image": "https://wallpapers.com/images/hd/fashion-model-runway-stride-99ncit4xjfmpcueu.jpg",
            "url": "https://wallpapers.com/images/hd/fashion-model-runway-stride-99ncit4xjfmpcueu.jpg"
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
