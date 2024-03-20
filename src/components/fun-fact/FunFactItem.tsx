import React, {useState} from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const FunFactItem = ({data, spaceBottomClass, textAlignClass}: any) => {
    const [didViewCountUp, setDidViewCountUp] = useState(false);

    const onVisibilityChange = (isVisible : any) => {
        if (isVisible) {
            setDidViewCountUp(true);
        }
    };
    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div
                className={`single-count ${textAlignClass ? textAlignClass : ""} ${
                    spaceBottomClass ? spaceBottomClass : ""
                }`}
            >
                <div className="count-icon">
                    <i className={data.iconClass}/>
                </div>
                <h2 className="count">
                    <VisibilitySensor
                        onChange={onVisibilityChange}
                        offset={{top: 10}}
                        delayedCall
                    >
                        <CountUp end={didViewCountUp ? data.countNum : 0}/>
                    </VisibilitySensor>
                </h2>
                <span>{data.title}</span>
            </div>
        </div>
    );
};

export default FunFactItem;
