import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";

const Logo = ({imageUrl, logoClass}: any) => {
    return (
        <div className={`d-flex ${logoClass ? logoClass : ""}`}>
            <Link to={"/"}>
                <img alt="logo" src={imageUrl}/>
            </Link>
        </div>
    );
};

Logo.propTypes = {
    imageUrl: PropTypes.string,
    logoClass: PropTypes.string
};

export default Logo;
