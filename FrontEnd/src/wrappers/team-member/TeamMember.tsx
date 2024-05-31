import React from "react";
import TeamMemberSectionTitle from "../../components/section-title/TeamMemberSectionTitle";
import TeamMemberItem from "../../components/team-member/TeamMemberItem";

const TeamMember = ({spaceTopClass, spaceBottomClass}: any) => {

    const teamMemberData = [
        {
            "id": "1",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQME4teY0Rb0HDGQAmFUrlzHHoUyUIrxo4euDFoVZs_tfcut-i72ivjdK5vGYpORtaP60&usqp=CAU",
            "fbLink": "//www.facebook.com",
            "twitterLink": "//www.twitter.com",
            "instagramLink": "//www.instagram.com",
            "name": "Đinh Huy Hoàng",
            "position": "Thành viên"
        },
        {
            "id": "2",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQME4teY0Rb0HDGQAmFUrlzHHoUyUIrxo4euDFoVZs_tfcut-i72ivjdK5vGYpORtaP60&usqp=CAU",
            "fbLink": "//www.facebook.com",
            "twitterLink": "//www.twitter.com",
            "instagramLink": "//www.instagram.com",
            "name": "Nguyễn Ngọc Huy",
            "position": "Thành viên"
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
                    titleText="Nhóm của chúng tôi"
                    positionClass="text-center"
                    spaceClass="mb-60"
                />

                <div className="row" style={{"justifyContent": "center"}}>
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
