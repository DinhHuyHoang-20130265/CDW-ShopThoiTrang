import React from "react";
import BlogItem from "../../components/blog/BlogItem";
import SectionTitle from "../../components/section-title/SectionTitle";

const Blog = ({spaceTopClass, spaceBottomClass}: any) => {

    const blogFeaturedData = [
            {
                "id": 1,
                "image": "/assets/img/blog/blog-1.jpg",
                "category": ["lifestyle", "men"],
                "title": "A guide to latest trends",
                "url": "/blog-details-standard",
                "author": "Admin",
                "authorUrl": "/blog-standard"
            },
            {
                "id": 2,
                "image": "/assets/img/blog/blog-2.jpg",
                "category": ["lifestyle"],
                "title": "Five ways to lead a happy life",
                "url": "/blog-details-standard",
                "author": "Admin",
                "authorUrl": "/blog-standard"
            },
            {
                "id": 3,
                "image": "/assets/img/blog/blog-3.jpg",
                "category": ["lifestyle"],
                "title": "Tips on having a happy life",
                "url": "/blog-details-standard",
                "author": "Admin",
                "authorUrl": "/blog-standard"
            }
        ]
    ;

    return (
        <div
            className={`blog-area ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
            }`}
        >
            <div className="container">
                <SectionTitle
                    titleText="TIN TỨC"
                    positionClass="text-center"
                    spaceClass="mb-55"
                />
                <div className="row">
                    {blogFeaturedData.map((singlePost: any) => {
                        return (
                            <BlogItem singlePost={singlePost} key={singlePost.id}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Blog;
