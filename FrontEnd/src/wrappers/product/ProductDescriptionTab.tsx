import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import {Rating} from "@mui/material";

const ProductDescriptionTab = ({spaceBottomClass, productFullDesc, product, reviews}: any) => {

    console.log(reviews);



    return (
        <div className={`description-review-area ${spaceBottomClass}`}>
            <div className="container">
                <div className="description-review-wrapper">
                    <Tab.Container defaultActiveKey="productDescription">
                        <Nav variant="pills" className="description-review-topbar">
                            <Nav.Item>
                                <Nav.Link eventKey="additionalInfo">
                                    Thông tin
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="productDescription">Mô tả</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="productReviews">Đánh giá({reviews.length})</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="description-review-bottom">
                            <Tab.Pane eventKey="additionalInfo">
                                <div className="product-anotherinfo-wrapper">
                                    <ul>
                                        <li>
                                            <span>Weight</span> 400 g
                                        </li>
                                        <li>
                                            <span>Dimensions</span>10 x 10 x 15 cm{" "}
                                        </li>
                                        <li>
                                            <span>Materials</span> 60% cotton, 40% polyester
                                        </li>
                                        <li>
                                            <span>Other Info</span> American heirloom jean shorts pug
                                            seitan letterpress
                                        </li>
                                    </ul>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="productDescription">
                                {productFullDesc}
                            </Tab.Pane>
                            <Tab.Pane eventKey="productReviews">
                                <div className="container w-50">
                                    <div className="row">
                                        {reviews.map((review: any) => (
                                            review && review.type === 2 && (
                                                <div className="col-lg-12">
                                                    <div className="review-wrapper">
                                                        <div className="single-review">
                                                            <div className="review-img">
                                                                <img
                                                                    style={{width: "50px", height: "50px"}}
                                                                    src={review.reviewer.userInfo.avtUrl}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="review-content">
                                                                <div className="review-top-wrap">
                                                                    <div className="review-left">
                                                                        <div className="review-name">
                                                                            <h4>{review.reviewer.userInfo.fullName}</h4>
                                                                        </div>
                                                                        <Rating name="read-only" value={review.rating}
                                                                                readOnly/>
                                                                    </div>
                                                                </div>
                                                                <div className="review-bottom">
                                                                    <p>
                                                                        {review.content}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )

                                        ))}
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
};

ProductDescriptionTab.propTypes = {
    productFullDesc: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    product: PropTypes.object,
    reviews: PropTypes.array
};

export default ProductDescriptionTab;
