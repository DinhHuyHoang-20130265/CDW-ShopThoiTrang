import React from "react";

const TeamMemberItem = ({data, spaceBottomClass}: any) => {
    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div
                className={`team-wrapper ${spaceBottomClass ? spaceBottomClass : ""}`}
            >
                <div className="team-img">
                    <img
                        src={process.env.PUBLIC_URL + data.image}
                        alt=""
                        className="img-fluid"
                    />
                    <div className="team-action">
                        <a
                            className="facebook"
                            href={data.fbLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa fa-facebook"/>
                        </a>
                        <a
                            className="twitter"
                            href={data.twitterLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa fa-twitter"/>
                        </a>
                        <a
                            className="instagram"
                            href={data.instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa fa-instagram"/>
                        </a>
                    </div>
                </div>
                <div className="team-content text-center">
                    <h4>{data.name}</h4>
                    <span>{data.position} </span>
                </div>
            </div>
        </div>
    );
};


export default TeamMemberItem;
