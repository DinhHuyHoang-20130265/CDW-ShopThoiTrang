import React from "react";
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import CardWithIcon from "./CardWithIcon";

interface Props {
    value?: number;
}
const NbNewReviews = (props : Props) => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/review"
            icon={ReviewsRoundedIcon}
            title={"Đánh giá mới"}
            subtitle={value}
        />
    );
}

export default NbNewReviews;