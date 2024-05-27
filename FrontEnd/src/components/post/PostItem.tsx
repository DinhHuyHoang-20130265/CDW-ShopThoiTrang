import React from "react";
import {Link} from "react-router-dom";

const PostItem = ({post}: any) => {
    const postRef = React.createRef();
    return (
        <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="blog-wrap-2 mb-30">
                <div className="blog-img-2">
                    <Link to={"/post-detail/" + post.id}>
                        <img
                            src={post.thumbnail ? post.thumbnail : "https://via.placeholder.com/416x233"}
                            alt=""
                        />
                    </Link>
                </div>
                <div className="blog-content-2">
                    <div className="blog-meta-2">
                        <ul>
                            <li>{post.updateDate}</li>
                            <li>
                                <Link to={"/post-detail/" + post.id}>
                                    {post.updateBy}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <h4>
                        <Link to={"/post-detail/" + post.id}>
                            {post.title}
                        </Link>
                    </h4>
                    <p>
                        {post.description}
                    </p>
                    <div className="blog-share-comment">
                        <div className="blog-btn-2">
                            <Link to={"/post-detail/" + post.id}>
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;



