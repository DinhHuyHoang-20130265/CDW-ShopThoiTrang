import PropTypes from "prop-types";
import React, {Fragment} from "react";

const LayoutAdmin = ({children, headerContainerClass, headerTop, headerPaddingClass, headerPositionClass}: any) => {
    return (
        <Fragment>
            <div className="card-text">
                LayoutAdmin
            </div>
            {children}
        </Fragment>
    );
};

LayoutAdmin.propTypes = {
    children: PropTypes.any,
    headerContainerClass: PropTypes.string,
    headerPaddingClass: PropTypes.string,
    headerPositionClass: PropTypes.string,
    headerTop: PropTypes.string
};

export default LayoutAdmin;
