import React from "react";
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import CardWithIcon from "./CardWithIcon";

interface Props {
    value?: number;
    percent?: any;
}
const NbNewReviews = (props : Props) => {
    const { value,percent } = props;
    return (
        <CardWithIcon
            to="/review"
            icon={ReviewsRoundedIcon}
            title={"Đánh giá mới"}
            subtitle={value}
            percent={percent}
        />
    );
}

export default NbNewReviews;