import PropTypes from "prop-types";
import React from "react";

const FooterNewsletter = ({spaceBottomClass, spaceLeftClass, sideMenu, colorClass, widgetColorClass}: any) => {
    return (
        <div
            className={`footer-widget ${spaceBottomClass ? spaceBottomClass : ""} ${
                sideMenu ? "ml-ntv5" : spaceLeftClass ? spaceLeftClass : ""
            } ${widgetColorClass ? widgetColorClass : ""}`}
        >
            <div className="footer-title">
                <h3>ĐỒNG HÀNH VỚI</h3>
            </div>
            <div className={`subscribe-style ${colorClass ? colorClass : ""}`}>
                <ul>
                    <li style={{height: "50px", display: "flex", alignItems: "center"}}>
                        <img
                            src="https://idoo.com.vn/image/cache/catalog/lp-home/khach-hang-doi-tac/khach-hang-ghn-logo-500x300.png"
                            alt="logo" style={{maxWidth: "100px"}}/>
                    </li>
                    <li style={{height: "50px", display: "flex", alignItems: "center"}}>
                        <img
                            src="/assets/vnpay.png"
                            alt="logo" style={{maxWidth: "100px"}}/>
                    </li>
                    <li style={{height: "50px", display: "flex", alignItems: "center"}}>
                        <img
                            src="/assets/payos-logo.png"
                            alt="logo" style={{maxWidth: "100px"}}/>
                    </li>
                </ul>
            </div>
        </div>
    );
};

FooterNewsletter.propTypes = {
    spaceBottomClass: PropTypes.string,
    spaceLeftClass: PropTypes.string,
    colorClass: PropTypes.string,
    widgetColorClass: PropTypes.string,
    sideMenu: PropTypes.any
};

export default FooterNewsletter;
