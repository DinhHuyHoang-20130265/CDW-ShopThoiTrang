import React, {Fragment, useEffect, useState} from "react";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import PostsList from "../../wrappers/blog/PostsList";
import PostSidebar from "../../wrappers/blog/PostSidebar";
import axios from "axios";
// @ts-ignore
import Paginator from "react-hooks-paginator";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState('');
    const [length, setLength] = useState(0);
    const pageLimit = 6;
    useEffect(() => {
        const fectch = async () => {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}blog/user`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                }
            }).then(response => {
                setPosts(response.data);
                setCurrentData(response.data.slice(offset, offset + pageLimit));
            })
        }
        fectch();
    }, []);

    useEffect(() => {
        setLength(posts.filter((post: any) => post.title.indexOf(search) !== -1).length);
        setCurrentData(posts.filter((post: any) => post.title.indexOf(search) !== -1).slice(offset, offset + pageLimit));
    }, [offset, posts, search, length]);

    return (
        <Fragment>
            <Breadcrumb/>
            <div className="blog-area pt-100 pb-100">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-9">
                            <div className="ml-20">
                                <div className="row">
                                    <PostsList posts={currentData}/>
                                </div>
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <PostSidebar setSearch={setSearch}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Posts;
