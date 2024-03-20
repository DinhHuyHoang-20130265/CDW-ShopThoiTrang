import React from "react";
import TextGridItem from "../../components/text-grid/TextGridItem";

const TextGrid = ({spaceBottomClass}: any) => {

    const textGridData = [
            {
                "id": "1",
                "title": "Our Vision",
                "text": "Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth."
            },
            {
                "id": "2",
                "title": "Our Mission",
                "text": "Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth."
            },
            {
                "id": "3",
                "title": "Our Goal",
                "text": "Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth."
            }
        ]
    ;

    return (
        <div
            className={`about-mission-area ${
                spaceBottomClass ? spaceBottomClass : ""
            }`}
        >
            <div className="container">
                <div className="row">
                    {textGridData &&
                        textGridData.map((single, key) => {
                            return (
                                <TextGridItem
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


export default TextGrid;
