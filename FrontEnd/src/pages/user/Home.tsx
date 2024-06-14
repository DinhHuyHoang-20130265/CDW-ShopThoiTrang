import React from "react";
import Slider from "../../wrappers/Slider";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import Blog from "../../wrappers/blog/Blog";
import VoucherContainer from "../../wrappers/voucherDiscount/VoucherContainer";

const Home = () => {
    return (
        <div>
            <Slider/>

            <VoucherContainer spaceTopClass="pt-100" spaceBottomClass="pb-60"/>

            <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60"/>

            <TabProduct spaceBottomClass="pb-60"/>

            <Blog spaceBottomClass="pb-55"/>
        </div>
    );
};

export default Home;
