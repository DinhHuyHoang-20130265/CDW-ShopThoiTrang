import React from "react";
import {Link} from "react-router-dom";

const PostItem = ({post}: any) => {

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
                            <li>{post.createDate}</li>
                            <li>
                                <Link to={"/post-detail/" + post.id}>
                                    4 <i className="fa fa-comments-o"/>
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
                        {/*<div className="blog-share">*/}
                        {/*    <span>share :</span>*/}
                        {/*    <div className="share-social">*/}
                        {/*        <ul>*/}
                        {/*            <li>*/}
                        {/*                <a className="facebook" href="//facebook.com">*/}
                        {/*                    <i className="fa fa-facebook"/>*/}
                        {/*                </a>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <a className="twitter" href="//twitter.com">*/}
                        {/*                    <i className="fa fa-twitter"/>*/}
                        {/*                </a>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <a className="instagram" href="//instagram.com">*/}
                        {/*                    <i className="fa fa-instagram"/>*/}
                        {/*                </a>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;



