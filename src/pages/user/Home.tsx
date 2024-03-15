import React from "react";
import Slider from "../../wrappers/Slider";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";

const Home = () => {
    return (
        <div>
            <Slider/>

            <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

            {/*/!* tab product *!/*/}
            {/*<TabProduct spaceBottomClass="pb-60" category="fashion" />*/}

            {/*/!* blog featured *!/*/}
            {/*<BlogFeatured spaceBottomClass="pb-55" />*/}
        </div>
    );
};

export default Home;
