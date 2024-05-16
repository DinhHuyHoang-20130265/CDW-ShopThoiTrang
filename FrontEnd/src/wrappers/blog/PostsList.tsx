import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import PostItem from "../../components/post/PostItem";

const PostsList = ({posts}: any) => {
    return (
        <Fragment>
            {posts.map((post: any, key: any) => (
                <PostItem post={post} key={key}/>
            ))}
        </Fragment>
    );
};

export default PostsList
