import React, {Fragment} from "react";

const ProductRating = ({reviews}: any) => {
    const ratingValue = reviews.reduce((total: any, val: any) => total + val.rating, 0) / reviews.length;
    console.log(ratingValue);
    let rating = [];

    for (let i = 0; i < 5; i++) {
        rating.push(<i className="fa fa-star-o" key={i}></i>);
    }
    if (ratingValue && ratingValue > 0) {
        for (let i = 0; i <= ratingValue - 1; i++) {
            rating[i] = <i className="fa fa-star-o yellow" key={i}></i>;
        }
    }
    return <Fragment>{rating}</Fragment>;
};

export default ProductRating;
