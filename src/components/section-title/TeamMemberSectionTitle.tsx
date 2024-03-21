import React from "react";

const TeamMemberSectionTitle = ({
                                    titleText,
                                    subTitleText,
                                    positionClass,
                                    spaceClass
                                }: any) => {
    return (
        <div
            className={`section-title-2 ${positionClass ? positionClass : ""} ${
                spaceClass ? spaceClass : ""
            }`}
        >
            <h2>{titleText}</h2>
            <p>{subTitleText}</p>
        </div>
    );
};


export default TeamMemberSectionTitle;
