import React, {Fragment} from "react";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import PostsList from "../../wrappers/blog/PostsList";
import PostPagination from "../../wrappers/blog/PostPagination";
import PostSidebar from "../../wrappers/blog/PostSidebar";

const Posts = () => {

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="blog-area pt-100 pb-100">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-9">
                            <div className="ml-20">
                                <div className="row">
                                    <PostsList/>
                                </div>

                                {/* blog pagination */}
                                <PostPagination/>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            {/* blog sidebar */}
                            <PostSidebar/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Posts;
