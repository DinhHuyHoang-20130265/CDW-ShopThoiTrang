import React from "react";
import Slider from "../../wrappers/Slider";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import Blog from "../../wrappers/blog/Blog";

const Home = () => {
    return (
        <div>
            {/* slider */}
            <Slider/>

            {/* featured icon */}
            <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60"/>

            {/* tab product */}
            <TabProduct spaceBottomClass="pb-60"/>

            {/* blog */}
            <Blog spaceBottomClass="pb-55"/>
        </div>
    );
};

export default Home;
