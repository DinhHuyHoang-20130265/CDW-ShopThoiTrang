import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";

const MobileNavMenu = ({categories}: any) => {
    return (
        <nav className="offcanvas-navigation" id="offcanvas-navigation">
            <ul>
                <li>
                    <Link to={"/about"}>
                        Giới thiệu
                    </Link>
                </li>
                <li>
                    <Link to={"/"}> Trang chủ
                    </Link>
                </li>
                <li>
                    <Link to={"/shop"}>
                        Sản phẩm
                    </Link>
                </li>
                <li>
                    <Link to={"/post"}>
                        Blog
                    </Link>
                </li>
                <li>
                    <Link to={"/contact"}>
                        Liên hệ
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

MobileNavMenu.propTypes = {
    categories: PropTypes.object
}

export default MobileNavMenu
