import React, {Fragment} from "react";
import LayoutUser from "../layout/layoutUser";
import Slider from "../../wrappers/Slider";

const Home = () => {
    return (
        <Fragment>
            <LayoutUser
                headerContainerClass="container-fluid"
                headerPaddingClass="header-padding-1">

                <Slider/>

                {/*/!* featured icon *!/*/}
                {/*<FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />*/}

                {/*/!* tab product *!/*/}
                {/*<TabProduct spaceBottomClass="pb-60" category="fashion" />*/}

                {/*/!* blog featured *!/*/}
                {/*<BlogFeatured spaceBottomClass="pb-55" />*/}
            </LayoutUser>
        </Fragment>
    );
};

export default Home;
