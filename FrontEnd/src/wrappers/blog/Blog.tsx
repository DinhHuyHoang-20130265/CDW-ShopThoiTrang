import React, {useEffect, useState} from "react";
import BlogItem from "../../components/blog/BlogItem";
import SectionTitle from "../../components/section-title/SectionTitle";
import axios from "axios";

const Blog = ({spaceTopClass, spaceBottomClass}: any) => {
    const [blogData, setBlogData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}blog/user`)
                .then((res) => {
                    setBlogData(res.data.slice(0, 3));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        fetchData();
    }, []);

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
                <div className="row" style={{justifyContent: "center"}}>
                    {blogData.map((singlePost: any) => {
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
