import React, {Fragment} from "react";
import Header from "../../wrappers/header/Header";
import Footer from "../../wrappers/footer/Footer";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {useLocation} from "react-router-dom"

const LayoutUser = ({
                        children,
                        headerContainerClass,
                        headerTop,
                        headerPaddingClass,
                        headerPositionClass
                    }: any) => {

    const location = useLocation();
    const given = [
        {
            pathname: "product",
            name: "Chi tiết sản phẩm"
        }, {
            pathname: "shop",
            name: "Danh sách sản phẩm"
        }, {
            pathname: "cart",
            name: "Giỏ hàng"
        }, {
            pathname: "checkout",
            name: "Thanh toán"
        }, {
            pathname: "wishlist",
            name: "Yêu thích"
        }, {
            pathname: "about",
            name: "Về chúng tôi"
        }, {
            pathname: "contact",
            name: "Liên hệ"
        }, {
            pathname: "post",
            name: "Danh sách tin tức"
        }, {
            pathname: "post-details",
            name: "Danh sách tin tức"
        }, {
            pathname: "login",
            name: "Đăng nhập - Đăng ký"
        }, {
            pathname: "forgot-password",
            name: "Quên mật khẩu"
        }, {
            pathname: "404",
            name: "404"
        },
        {
            pathname: "my-account",
            name: "Tài khoản của tôi"
        }

    ]

    return (
        <Fragment>
            <Header
                layout={headerContainerClass}
                top={headerTop}
                headerPaddingClass={headerPaddingClass}
                headerPositionClass={headerPositionClass}
            />
            <BreadcrumbsItem to={"/"}>Trang chủ</BreadcrumbsItem>
            <BreadcrumbsItem to={"/" + location.pathname}>
                {
                    given.filter((item: any) =>
                        location.pathname.indexOf(item.pathname) !== -1)[0] ?
                        given.filter(
                            (item: any) => location.pathname.indexOf(item.pathname) !== -1
                        )[0].name
                        : "Không tìm thấy trang"}
            </BreadcrumbsItem>
            {children}
            <Footer
                backgroundColorClass="bg-gray"
                spaceTopClass="pt-100"
                spaceBottomClass="pb-70"
            />
        </Fragment>
    );
};

export default LayoutUser;
