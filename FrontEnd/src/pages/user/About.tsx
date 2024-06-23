import React, {Fragment} from "react";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import TextGrid from "../../wrappers/text-grid/TextGrid";
import FunFact from "../../wrappers/fun-fact/FunFact";
import TeamMember from "../../wrappers/team-member/TeamMember";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const About = () => {



    return (
        <Fragment>
            <Breadcrumb/>

            <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95"/>

            <TextGrid spaceBottomClass="pb-70"/>

            <FunFact
                spaceTopClass="pt-100"
                spaceBottomClass="pb-70"
                bgClass="bg-gray-3"
            />

            <TeamMember spaceTopClass="pt-95" spaceBottomClass="pb-70"/>
        </Fragment>
    );
};


export default About;
