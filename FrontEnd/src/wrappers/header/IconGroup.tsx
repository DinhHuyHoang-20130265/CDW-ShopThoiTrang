import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import {deleteFromCart} from "../../store/actions/cartActions";
import {logout} from "../../components/auth/Logout";
import {googleLogout} from "@react-oauth/google";

const IconGroup = ({
                       cartData,
                       wishlistData,
                       deleteFromCart,
                       iconWhiteClass
                   }: any) => {

    const [user, setUser]: any = useState(false);
    useEffect(() => {
        if (localStorage.getItem("user") !== null && localStorage.getItem("user") !== "") {
            setUser(true);
        }
    }, []);

    const handleClick = (e: any) => {
        e.currentTarget.nextSibling.classList.toggle("active");
    };

    const triggerMobileMenu = () => {
        const offcanvasMobileMenu: any = document.querySelector(
            "#offcanvas-mobile-menu"
        );
        offcanvasMobileMenu.classList.add("active");
    };

    function handleLogout() {
        logout();
        localStorage.removeItem("user");
        googleLogout();
        setUser(false);
        window.location.href = "/login-register";
    }

    return (
        <div
            className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
        >
            <div className="same-style header-search d-none d-lg-block">
                <button className="search-active" onClick={e => handleClick(e)}>
                    <i className="pe-7s-search"/>
                </button>
                <div className="search-content">
                    <form action="#">
                        <input type="text" placeholder="Search"/>
                        <button className="button-search">
                            <i className="pe-7s-search"/>
                        </button>
                    </form>
                </div>
            </div>
            <div className="same-style account-setting d-none d-lg-block">
                {user && user}
                <button
                    className="account-setting-active"
                    onClick={e => handleClick(e)}
                >
                    <i className="pe-7s-user-female"/>
                </button>
                <div className="account-dropdown">
                    <ul>
                        {!user ? <li>
                                <Link to={"/login-register"}>Đăng nhập - Đăng ký</Link>
                            </li>
                            : <>
                                <li>
                                    <Link to={"/my-account"}>
                                        Tài khoản của tôi
                                    </Link>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Đăng xuất</a>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
            <div className="same-style header-wishlist">
                <Link to={"/wishlist"}>
                    <i className="pe-7s-like"/>
                    <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
                </Link>
            </div>
            <div className="same-style cart-wrap d-none d-lg-block">
                <button className="icon-cart" onClick={e => handleClick(e)}>
                    <i className="pe-7s-shopbag"/>
                    <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
                </button>
                {/* menu cart */}
                <MenuCart
                    cartData={cartData}
                    deleteFromCart={deleteFromCart}
                />
            </div>
            <div className="same-style cart-wrap d-block d-lg-none">
                <Link className="icon-cart" to={"/cart"}>
                    <i className="pe-7s-shopbag"/>
                    <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
                </Link>
            </div>
            <div className="same-style mobile-off-canvas d-block d-lg-none">
                <button
                    className="mobile-aside-button"
                    onClick={() => triggerMobileMenu()}>
                    <i className="pe-7s-menu"/>
                </button>
            </div>
        </div>
    );
};

IconGroup.propTypes = {
    cartData: PropTypes.array,
    compareData: PropTypes.array,
    currency: PropTypes.object,
    iconWhiteClass: PropTypes.string,
    deleteFromCart: PropTypes.func,
    wishlistData: PropTypes.array
};

const mapStateToProps = (state: any) => {
    return {
        cartData: state.cartData,
        wishlistData: state.wishlistData,
        compareData: state.compareData
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteFromCart: (item: any, addToast: any) => {
            dispatch(deleteFromCart(item, addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);

