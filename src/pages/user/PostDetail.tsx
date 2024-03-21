import React, {Fragment} from "react";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import PostSidebar from "../../wrappers/blog/PostSidebar";
import Post from "../../wrappers/blog/Post";
import Comment from "../../wrappers/blog/Comment";

const PostDetail = () => {

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="blog-area pt-100 pb-100">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-9">
                            <div className="blog-details-wrapper ml-20">
                                <Post/>

                                <Comment/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <PostSidebar/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default PostDetail;
