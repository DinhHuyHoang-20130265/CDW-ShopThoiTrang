import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";

const FooterCopyright = ({footerLogo, spaceBottomClass, colorClass}: any) => {
    return (
        <div
            className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${
                colorClass ? colorClass : ""
            }`}
        >
            <div className="footer-logo">
                <Link to={process.env.PUBLIC_URL + "/"}>
                    <img alt="" src={process.env.PUBLIC_URL + footerLogo}/>
                </Link>
            </div>
            <p>
                © 2024{" "}
                <a href="https://hcmuaf.edu.vn" rel="noopener noreferrer" target="_blank">
                    NLU
                </a>
                .<br/> All Rights Reserved
            </p>
        </div>
    );
};

FooterCopyright.propTypes = {
    footerLogo: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    colorClass: PropTypes.string
};

export default FooterCopyright;
