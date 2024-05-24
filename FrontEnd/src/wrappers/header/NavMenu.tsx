import React from "react";
import {Link} from "react-router-dom";

const NavMenu = ({menuWhiteClass, sidebarMenu}: any) => {
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
        </div>
    );
};


export default NavMenu
