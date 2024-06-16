import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import {deleteFromCart} from "../../store/actions/cartActions";
import {logout} from "../../components/auth/Logout";
import {googleLogout} from "@react-oauth/google";
import {getSortedProducts} from "../../helpers/product";

const IconGroup = ({
                       cartData,
                       wishlistData,
                       deleteFromCart,
                       iconWhiteClass,
                       products
                   }: any) => {

    const [user, setUser]: any = useState(false);

    const [listProduct, setListProduct] = useState<any>([]);
    const [searchValue, setSearchValue] = useState<any>("");
    useEffect(() => {
        if (localStorage.getItem("user") !== null && localStorage.getItem("user") !== "") {
            setUser(true);
        }
    }, []);

    const onSearch = (e: any) => {
        e.preventDefault();
        const search = e.target.value;
        if (search === "") {
            setListProduct([]);
            return;
        }
        setSearchValue(search);
        setListProduct(getSortedProducts(products, [], [], [], search, 'default'));
    }

    const handleClick = (e: any) => {
        e.currentTarget.nextSibling.classList.toggle("active");
        const offCanvas: NodeListOf<Element> = document.querySelectorAll(".button-list-header .same-style");
        offCanvas.forEach((element: Element) => {
            if (element.firstElementChild !== e.currentTarget && element.lastElementChild) {
                element.lastElementChild.classList.remove('active');
            }
        });
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
            className={`header-right-wrap button-list-header ${iconWhiteClass ? iconWhiteClass : ""}`}
        >
            <div className="same-style header-search d-none d-lg-block">
                <button className="search-active" onClick={e => handleClick(e)}>
                    <i className="pe-7s-search"/>
                </button>
                <div className="search-content">
                    <form>
                        <input type="text" placeholder="Tìm kiếm" name={'search'}
                               onChange={(e) => onSearch(e)}/>
                        <button className="button-search">
                            <i className="pe-7s-search"/>
                        </button>
                    </form>
                    <br/>
                    <div style={{
                        height: listProduct.length > 0 ? '350px' : 'auto',
                        overflowY: 'scroll',
                        width: '300px'
                    }}>
                        <ul style={{width: '100%'}}>
                            {listProduct && listProduct.length > 0 ? listProduct.map((item: any, index: any) => (
                                <li>
                                    <Link to={`/product/${item.id}`}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: 'center',
                                            justifyContent: 'space-evenly'
                                        }}>
                                            <img src={item.imageUrl} alt="" style={{
                                                height: '50%', width: '50%'
                                            }}/>
                                            <div style={{
                                                display: "flex",
                                                alignItems: 'center',
                                                justifyContent: 'space-evenly',
                                                flexDirection: 'column'
                                            }}>
                                                <span>{item.name}</span>
                                                <span>{item.price.price} đ</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )) : <>Không tìm thấy sản phẩm</>}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="same-style account-setting d-block d-lg-block">
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
            <div className="same-style cart-wrap d-block d-lg-block">
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
        products: state.productData.products,
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

