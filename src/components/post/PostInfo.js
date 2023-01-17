import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../store/PostAction";
import { postActions } from "../../store/PostSlice";
import { userActions } from "../../store/UserSlice";
import { loggedInUserInformation } from "../../store/UserAction";
import { Avatar, CircularProgress } from "@mui/material";
import "./postInfo.css";
import Layout from "../layout/Layout";
import { commentActions } from "../../store/CommentSlice";

function PostInfo() {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type, postId } = useParams();
  const [commentText, setCommentText] = useState("");
  const { userScreenLoader, userLoggedIn, userAuth } = useSelector(
    (state) => state.user
  );
  const { postScreenLoader, currentPost, postFetched } = useSelector(
    (state) => state.post
  );
  const { commentCreated } = useSelector((state) => state.comment);
  useEffect(() => {
    if (userLoggedIn) {
      dispatch(userActions.updateUserScreenLoaderValue());
      dispatch(loggedInUserInformation());
    }
    dispatch(postActions.updatePostScreenLoaderValue());
    dispatch(getPostById(postId));
  }, [userLoggedIn, postId, dispatch]);

  useEffect(() => {
    if (userAuth) {
      navigate("/login");
    }
  }, [userAuth, navigate]);

  useEffect(() => {
    if (commentCreated) {
      setCommentText("");
    }
    dispatch(commentActions.updateCommentCreatedValue());
  }, [commentCreated, dispatch]);

  useEffect(() => {
    if (postFetched) {
      dispatch(
        userActions.updateDropdownTitleValue({
          name:
            type === "r"
              ? currentPost?.postedForCommunity?.id?.communityName
              : currentPost?.postedForUser?.id?.username,
          image:
            type === "r"
              ? currentPost?.postedForCommunity?.id?.communityPicture
              : currentPost?.postedForUser?.id?.picture,
          type: "image",
        })
      );
      dispatch(postActions.updatePostFetchedValue());
    }
  }, [dispatch, postFetched, currentPost, type]);

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      {(!userLoggedIn && postScreenLoader) ||
      (userLoggedIn && userScreenLoader && postScreenLoader) ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="postinfo-wrapper">
          <div className="profile-container">
            <Avatar
              sx={{ width: "50px", height: "50px" }}
              alt={
                type === "r"
                  ? currentPost?.postedForCommunity?.id?.communityName?.toUpperCase()
                  : currentPost?.postedForUser?.id?.username?.toUpperCase()
              }
              variant="circle"
              src={
                type === "r"
                  ? `${imageURL}/render/image/${currentPost?.postedForCommunity?.id?.communityPicture}`
                  : `${imageURL}/render/image/${currentPost?.postedForUser?.id?.picture}`
              }
            />
            <p>
              {type === "r" ? (
                <>r/{currentPost?.postedForCommunity?.id?.communityName}</>
              ) : (
                <>u/{currentPost?.postedForUser?.id?.username}</>
              )}
            </p>
          </div>
          <Layout
            query={"post-info"}
            data={{
              currentPost,
              type,
              comment: true,
              commentText,
              setCommentText,
            }}
          />
        </div>
      )}
    </>
  );
}

export default PostInfo;
