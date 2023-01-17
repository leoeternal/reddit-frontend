import React from "react";
import Post from "./Post";

function PostInfoLeftComponent({ data }) {
  const { type, currentPost, commentText, setCommentText } = data;
  return (
    <>
      <Post
        currentPost={currentPost}
        type={type}
        comment={true}
        commentText={commentText}
        setCommentText={setCommentText}
      />
    </>
  );
}

export default PostInfoLeftComponent;
