import React, {Fragment} from "react";
import parse from 'html-react-parser';
import {Comments, FacebookProvider} from "react-facebook";

const Post = ({post}: any) => {
    return (
        <Fragment>
            <div className="blog-details-top">
                <div style={{marginBottom: '30px'}}>
                    <h1 style={{textAlign: 'center', marginBottom: '20px'}}>{post.title}</h1>
                    <p>{post.description}</p>
                </div>
                <div className="blog-details-img">
                    <img
                        alt=""
                        src={post.thumbnail ? post.thumbnail : "https://via.placeholder.com/800x400"}
                    />
                </div>
                <div className="blog-details-content">
                    {parse(post.content)}
                    <div className="blog-meta-2">
                        <ul>
                            <li>{post.createDate}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="tag-share">
                <div className="blog-share">
                    <span>share :</span>
                    <div className="share-social">
                        <ul>
                            <li>
                                <a className="facebook" href="//facebook.com">
                                    <i className="fa fa-facebook"/>
                                </a>
                            </li>
                            <li>
                                <a className="twitter" href="//twitter.com">
                                    <i className="fa fa-twitter"/>
                                </a>
                            </li>
                            <li>
                                <a className="instagram" href="//instagram.com">
                                    <i className="fa fa-instagram"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Post;
