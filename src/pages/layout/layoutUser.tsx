import PropTypes from "prop-types";
import React, {Fragment} from "react";
import Header from "../../wrappers/header/Header";
import Footer from "../../wrappers/footer/Footer";

const LayoutUser = ({
                        children,
                        headerContainerClass,
                        headerTop,
                        headerPaddingClass,
                        headerPositionClass
                    }: any) => {
    return (
        <Fragment>
            <Header
                layout={headerContainerClass}
                top={headerTop}
                headerPaddingClass={headerPaddingClass}
                headerPositionClass={headerPositionClass}
            />
            {children}
            <Footer
                backgroundColorClass="bg-gray"
                spaceTopClass="pt-100"
                spaceBottomClass="pb-70"
            />
        </Fragment>
    );
};

LayoutUser.propTypes = {
    children: PropTypes.any,
    headerContainerClass: PropTypes.string,
    headerPaddingClass: PropTypes.string,
    headerPositionClass: PropTypes.string,
    headerTop: PropTypes.string
};

export default LayoutUser;
