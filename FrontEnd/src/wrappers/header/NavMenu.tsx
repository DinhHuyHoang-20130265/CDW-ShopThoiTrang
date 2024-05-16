import React from "react";
import {Link} from "react-router-dom";

const NavMenu = ({categories, menuWhiteClass, sidebarMenu}: any) => {
    return (
        <div className={` ${
            sidebarMenu
                ? "sidebar-menu"
                : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
        } `}
        >
            <nav>
                <ul>
                    <li>
                        <Link to={"/about"}>
                            Giới thiệu
                        </Link>
                    </li>
                    <li>
                        <Link to={process.env.PUBLIC_URL + "/"}> Trang chủ {sidebarMenu ? (
                                <span> <i className="fa fa-angle-right"></i> </span>)
                            : ("")}
                        </Link>
                    </li>
                    <li>
                        <Link to={process.env.PUBLIC_URL + "/shop"}>
                            Sản phẩm
                            {/*{["categories"]}*/}
                            {sidebarMenu ? (
                                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
                            ) : (
                                <i className="fa fa-angle-down"/>
                            )}
                        </Link>
                        <ul className="mega-menu">
                            <li>
                                <ul>
                                    <li className="mega-menu-title">
                                        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                                            {["shop_layout"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                                            {["shop_grid_standard"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/shop-grid-filter"}>
                                            {["shop_grid_filter"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/shop-grid-two-column"}>
                                            {["shop_grid_two_column"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"}>
                                            {["shop_grid_no_sidebar"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/shop-grid-full-width"}>
                                            {["shop_grid_full_width"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={process.env.PUBLIC_URL + "/shop-grid-right-sidebar"}
                                        >
                                            {["shop_grid_right_sidebar"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/shop-list-standard"}>
                                            {["shop_list_standard"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/shop-list-full-width"}>
                                            {["shop_list_full_width"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/shop-list-two-column"}>
                                            {["shop_list_two_column"]}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li className="mega-menu-title">
                                        <Link to={process.env.PUBLIC_URL + "/product/1"}>
                                            {["product_details"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/product/1"}>
                                            {["product_tab_bottom"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/product-tab-left/1"}>
                                            {["product_tab_left"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/product-tab-right/1"}>
                                            {["product_tab_right"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/product-sticky/1"}>
                                            {["product_sticky"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/product-slider/1"}>
                                            {["product_slider"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={process.env.PUBLIC_URL + "/product-fixed-image/1"}
                                        >
                                            {["product_fixed_image"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/product/8"}>
                                            {["product_simple"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/product/1"}>
                                            {["product_variation"]}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/product/9"}>
                                            {["product_affiliate"]}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li className="mega-menu-img">
                                        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                                            <img
                                                src={
                                                    process.env.PUBLIC_URL +
                                                    "/assets/img/banner/banner-12.png"
                                                }
                                                alt=""
                                            />
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                            Khuyến mãi
                        </Link>
                    </li>

                    <li>
                        <Link to={"/post"}>
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link to={process.env.PUBLIC_URL + "/contact"}>
                            Liên hệ
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};


export default NavMenu
