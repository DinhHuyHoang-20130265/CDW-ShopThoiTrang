import React from "react";
import TeamMemberSectionTitle from "../../components/section-title/TeamMemberSectionTitle";
import TeamMemberItem from "../../components/team-member/TeamMemberItem";

const TeamMember = ({spaceTopClass, spaceBottomClass}: any) => {

    const teamMemberData = [
        {
            "id": "1",
            "image": "/assets/img/team/team-1.jpg",
            "fbLink": "//www.facebook.com",
            "twitterLink": "//www.twitter.com",
            "instagramLink": "//www.instagram.com",
            "name": "Mr.Mike Banding",
            "position": "Manager"
        },
        {
            "id": "2",
            "image": "/assets/img/team/team-3.jpg",
            "fbLink": "//www.facebook.com",
            "twitterLink": "//www.twitter.com",
            "instagramLink": "//www.instagram.com",
            "name": "Mr.Peter Pan",
            "position": "Developer"
        },
        {
            "id": "3",
            "image": "/assets/img/team/team-2.jpg",
            "fbLink": "//www.facebook.com",
            "twitterLink": "//www.twitter.com",
            "instagramLink": "//www.instagram.com",
            "name": "Ms.Sophia",
            "position": "Designer"
        },
        {
            "id": "4",
            "image": "/assets/img/team/team-4.jpg",
            "fbLink": "//www.facebook.com",
            "twitterLink": "//www.twitter.com",
            "instagramLink": "//www.instagram.com",
            "name": "Mr.John Lee",
            "position": "Chairman"
        }
    ]

    return (
        <div
            className={`team-area ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
            }`}
        >
            <div className="container">

                <TeamMemberSectionTitle
                    titleText="Team Members"
                    subTitleText="Lorem ipsum dolor sit amet conse ctetu."
                    positionClass="text-center"
                    spaceClass="mb-60"
                />

                <div className="row">
                    {teamMemberData &&
                        teamMemberData.map((single, key) => {
                            return (
                                <TeamMemberItem
                                    data={single}
                                    spaceBottomClass="mb-30"
                                    key={key}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default TeamMember;
