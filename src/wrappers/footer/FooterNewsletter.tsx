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
                <h3>NULL</h3>
            </div>
            <div className={`subscribe-style ${colorClass ? colorClass : ""}`}>

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
