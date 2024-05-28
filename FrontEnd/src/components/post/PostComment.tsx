import React, {Fragment} from "react";
import {Comments, CommentsCount, FacebookProvider} from "react-facebook";

interface PostCommentProps {
    post?: any
}

const PostComment = ({post}: PostCommentProps) => {
    return (
        <Fragment>
            <FacebookProvider appId="649226417231505" language={"vi_VN"}>
                <Comments
                    href={`http://127.0.0.1:3000/post-detail/${post.id}`}/>
            </FacebookProvider>
        </Fragment>
    );
};

export default PostComment;
