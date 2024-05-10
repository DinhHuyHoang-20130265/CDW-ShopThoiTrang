import React, {Fragment, useEffect, useState} from "react";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import PostsList from "../../wrappers/blog/PostsList";
import PostPagination from "../../wrappers/blog/PostPagination";
import PostSidebar from "../../wrappers/blog/PostSidebar";
import axios from "axios";
import {fetchProducts} from "../../store/actions/productActions";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fectch = async () => {
            await axios.get(`http://localhost:8080/api/blog/user`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                }
            }).then(response => {
                setPosts(response.data);
            })
        }
        fectch().then();
    }, []);

    console.log(posts);

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="blog-area pt-100 pb-100">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-9">
                            <div className="ml-20">
                                <div className="row">
                                    <PostsList posts={posts}/>
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
