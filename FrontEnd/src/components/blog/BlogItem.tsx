import React from "react";
import {Link} from "react-router-dom";

const BlogItem = ({singlePost}: any) => {
    return (
        <div className="col-lg-4 col-sm-6">
            <div className="blog-wrap mb-30 scroll-zoom">
                <div className="blog-img">
                    <Link to={`/post-detail/${singlePost.id}`}>
                        <img src={singlePost.thumbnail} alt=""/>
                    </Link>
                </div>
                <div className="blog-content-wrap">
                    <div className="blog-content text-center">
                        <h3>
                            <Link to={`/post-detail/${singlePost.id}`}>
                                {singlePost.title}
                            </Link>
                        </h3>
                        <span>
                            <a href={"#"}>{singlePost.updateBy}</a>
                        </span>
                        <br></br>
                        <span>
                            <a href={"#"}>{singlePost.updateDate}</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;
