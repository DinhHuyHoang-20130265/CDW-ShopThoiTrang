import PropTypes from "prop-types";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

// @ts-ignore
import {animateScroll} from "react-scroll";

import FooterNewsletter from "./FooterNewsletter";
import FooterCopyright from "./FooterCopyright";

const Footer = ({
                    backgroundColorClass,
                    spaceTopClass,
                    spaceBottomClass,
                    spaceLeftClass,
                    spaceRightClass,
                    containerClass,
                    extraFooterClass,
                    sideMenu
                }: any) => {
    const [scroll, setScroll] = useState(0);
    const [top, setTop] = useState(0);

    useEffect(() => {
        setTop(100);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        animateScroll.scrollToTop();
    };

    const handleScroll = () => {
        setScroll(window.scrollY);

    };

    return (
        <footer
            className={`footer-area ${
                backgroundColorClass ? backgroundColorClass : ""
            } ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
            } ${extraFooterClass ? extraFooterClass : ""} ${
                spaceLeftClass ? spaceLeftClass : ""
            } ${spaceRightClass ? spaceRightClass : ""}`}
        >
            <div className={`${containerClass ? containerClass : "container"}`}>
                <div className="row">
                    <div
                        className={`${
                            sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
                        }`}
                    >
                        <FooterCopyright
                            footerLogo="/assets/logomain.png"
                            spaceBottomClass="mb-30"
                        />
                    </div>
                    <div
                        className={`${
                            sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
                        }`}
                    >
                        <div className="footer-widget mb-30 ml-30">
                            <div className="footer-title">
                                <h3>VỀ CHÚNG TÔI</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <Link to={"/about"}>Giới thiệu</Link>
                                    </li>
                                    <li>
                                        <Link to={"/contact"}>
                                            Liên hệ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"https://tracking.ghn.dev/"}>
                                            Tra cứu vận chuyển đơn hàng
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${
                            sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
                        }`}
                    >
                        <div
                            className={`${
                                sideMenu
                                    ? "footer-widget mb-30 ml-95"
                                    : "footer-widget mb-30 ml-50"
                            }`}
                        >
                            <div className="footer-title">
                                <h3>CÁC TRANG</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <Link to={"/"}>Trang chủ</Link>
                                    </li>
                                    <li>
                                        <Link to={"/shop"}>
                                            Sản phẩm
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/post"}>Blog</Link>
                                    </li>
                                    <li>
                                        <Link to={"/contact"}>Liên hệ</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${
                            sideMenu ? "col-xl-3 col-sm-4" : "col-lg-2 col-sm-6"
                        }`}
                    >
                        <div
                            className={`${
                                sideMenu
                                    ? "footer-widget mb-30 ml-145"
                                    : "footer-widget mb-30 ml-75"
                            }`}
                        >
                            <div className="footer-title">
                                <h3>THEO DÕI</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <a
                                            href="//www.facebook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//www.twitter.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//www.instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//www.youtube.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Youtube
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${
                            sideMenu ? "col-xl-3 col-sm-8" : "col-lg-4 col-sm-6"
                        }`}
                    >

                        <FooterNewsletter
                            spaceBottomClass="mb-30"
                            spaceLeftClass="ml-70"
                            sideMenu={sideMenu}
                        />
                    </div>
                </div>
            </div>
            <button
                className={`scroll-top ${scroll > top ? "show" : ""}`}
                onClick={() => scrollToTop()}
            >
                <i className="fa fa-angle-double-up"></i>
            </button>
        </footer>
    );
};

Footer.propTypes = {
    backgroundColorClass: PropTypes.string,
    containerClass: PropTypes.string,
    extraFooterClass: PropTypes.string,
    sideMenu: PropTypes.any,
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
    spaceLeftClass: PropTypes.string,
    spaceRightClass: PropTypes.string
};

export default Footer;
