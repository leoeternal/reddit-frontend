import React, { useEffect, useState } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import Button from "@mui/material/Button";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import "./post.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, dislikePost, likePost } from "../../store/PostAction";
import { postActions } from "../../store/PostSlice";
import { toast } from "react-toastify";
import PostComment from "./PostComment";
import moment from "moment";
import {
  createComment,
  createReply,
  deleteComment,
  dislikeComment,
  likeComment,
} from "../../store/CommentAction";
import { commentActions } from "../../store/CommentSlice";
import { Tooltip } from "@mui/material";

function Post({
  currentPost,
  type,
  comment,
  commentText = "",
  setCommentText,
}) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postButtonLoader, postLikedLoader, upDownVotePostId, postDeleted } =
    useSelector((state) => state.post);
  const {
    commentButtonLoader,
    commentLikeLoader,
    upDownVoteCommentId,
    replyButtonLoader,
    replyCreated,
    commentDeleteButtonLoader,
    commentDeleteId,
  } = useSelector((state) => state.comment);
  const { userLoggedIn, loggedInUserInfo } = useSelector((state) => state.user);
  // const [optionPopup, setOptionPopup] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyTextarea, setReplyTextarea] = useState("");
  // const optionOpen = Boolean(optionPopup);

  useEffect(() => {
    if (postDeleted) {
      if (comment) {
        navigate("/");
      }
    }
  }, [postDeleted, comment, navigate, dispatch]);
  useEffect(() => {
    if (replyCreated) {
      setReplyText("");
      setReplyTextarea("");
    }
    dispatch(commentActions.updateReplyCreatedValue());
  }, [dispatch, replyCreated]);

  // const handleOptionPopupOpen = (event) => {
  //   setOptionPopup(event.currentTarget);
  //   event.stopPropagation();
  // };
  // const handleOptionPopupClose = (event) => {
  //   event.stopPropagation();
  //   setOptionPopup(null);
  // };

  const optionHandler = (action, event) => {
    event.stopPropagation();
    if (action === "delete") {
      dispatch(deletePost({ postId: currentPost?._id }));
    }
  };
  const postClickedHandler = (e) => {
    if (!comment) {
      if (currentPost?.postedForType === "community") {
        navigate(
          `/r/${currentPost?.postedForCommunity?.id?.communityName}/comments/${currentPost?._id}/${currentPost?.title}`
        );
      } else {
        navigate(
          `/user/${currentPost?.postedForUser?.id?.username}/comments/${currentPost?._id}/${currentPost?.title}`
        );
      }
    }
  };

  const communityNameHandler = (e) => {
    e.stopPropagation();
    navigate(`/r/${currentPost?.postedForCommunity?.id?.communityName}`);
  };
  const usernameHandler = (e) => {
    e.stopPropagation();
    navigate(`/user/${currentPost?.postedBy?.id?.username}/posts`);
  };

  const commentUsernameHandler = (e, username) => {
    e.stopPropagation();
    navigate(`/user/${username}/posts`);
  };

  const postUpvoteHandler = (e) => {
    e.stopPropagation();
    if (userLoggedIn) {
      dispatch(postActions.updateUpDownVotePostIdValue(currentPost?._id));
      dispatch(likePost(currentPost?._id));
    } else {
      toast.error("You are not logged in");
    }
  };

  const postDownvoteHandler = (e) => {
    e.stopPropagation();
    if (userLoggedIn) {
      dispatch(postActions.updateUpDownVotePostIdValue(currentPost?._id));
      dispatch(dislikePost(currentPost?._id));
    } else {
      toast.error("You are not logged in");
    }
  };

  const commentUpvoteHandler = (e, commentId) => {
    e.stopPropagation();
    if (userLoggedIn) {
      dispatch(commentActions.updateUpDownVoteCommentIdValue(commentId));
      dispatch(likeComment({ currentPostId: currentPost?._id, commentId }));
    } else {
      toast.error("You are not logged in");
    }
  };

  const commentDownvoteHandler = (e, commentId) => {
    e.stopPropagation();
    if (userLoggedIn) {
      dispatch(commentActions.updateUpDownVoteCommentIdValue(commentId));
      dispatch(dislikeComment({ currentPostId: currentPost?._id, commentId }));
    } else {
      toast.error("You are not logged in");
    }
  };

  const commentHandler = () => {
    if (userLoggedIn && commentText !== "") {
      const data = {
        postedBy: loggedInUserInfo?._id,
        post: currentPost?._id,
        text: commentText,
      };
      dispatch(createComment(data));
    } else if (userLoggedIn && commentText === "") {
      toast.error("Write something");
    } else {
      toast.error("You are not logged in");
    }
  };

  const replyHandler = (commentId) => {
    if (userLoggedIn && replyText !== "") {
      const data = {
        replyData: {
          postedBy: loggedInUserInfo?._id,
          post: currentPost?._id,
          text: replyText,
        },
        commentId,
      };

      dispatch(createReply(data));
    } else if (userLoggedIn && replyText === "") {
      toast.error("Write something");
    } else {
      toast.error("You are not logged in");
    }
  };

  const commentDeleteHandler = (commentId) => {
    dispatch(commentActions.updateCommentDeleteIdValue(commentId));
    dispatch(deleteComment({ postId: currentPost?._id, commentId }));
  };
  // currentPost?.postedForCommunity.id.communityName
  return (
    <div onClick={postClickedHandler} className="post-wrapper">
      <div className="post-left">
        {postLikedLoader && currentPost?._id === upDownVotePostId ? (
          <>
            <ThumbUpAltOutlinedIcon sx={{ color: "rgb(200,200,200)" }} />
            <p id="vote-count">
              {currentPost?.upvotes?.length - currentPost?.downvotes?.length}
            </p>
            <ThumbDownAltOutlinedIcon sx={{ color: "rgb(200,200,200)" }} />
          </>
        ) : (
          <>
            {!userLoggedIn ? (
              <>
                <ThumbUpAltOutlinedIcon
                  onClick={postUpvoteHandler}
                  sx={{ color: "rgb(135, 138, 140)" }}
                />
                <p id="vote-count">
                  {currentPost?.upvotes?.length -
                    currentPost?.downvotes?.length}
                </p>
                <ThumbDownAltOutlinedIcon
                  onClick={postDownvoteHandler}
                  sx={{ color: "rgb(135, 138, 140)" }}
                />
              </>
            ) : (
              <>
                {currentPost?.upvotes?.find((upvote) => {
                  return (
                    upvote?.toString() === loggedInUserInfo?._id?.toString()
                  );
                }) !== undefined ? (
                  <>
                    <ThumbUpAltOutlinedIcon
                      onClick={postUpvoteHandler}
                      className="vote-icon"
                      sx={{ color: "rgb(243, 100, 100)" }}
                    />
                  </>
                ) : (
                  <>
                    <ThumbUpAltOutlinedIcon
                      onClick={postUpvoteHandler}
                      className="vote-icon"
                      sx={{ color: "rgb(135, 138, 140)" }}
                    />
                  </>
                )}
                {currentPost?.downvotes?.find((downvote) => {
                  return (
                    downvote?.toString() === loggedInUserInfo?._id?.toString()
                  );
                }) !== undefined ? (
                  <p style={{ color: "rgb(2,112,211)" }} id="vote-count">
                    {currentPost?.upvotes?.length -
                      currentPost?.downvotes?.length}
                  </p>
                ) : (
                  <>
                    {currentPost?.upvotes?.find((upvote) => {
                      return (
                        upvote?.toString() === loggedInUserInfo?._id?.toString()
                      );
                    }) !== undefined ? (
                      <p
                        style={{ color: "rgb(243, 100, 100)" }}
                        id="vote-count"
                      >
                        {currentPost?.upvotes?.length -
                          currentPost?.downvotes?.length}
                      </p>
                    ) : (
                      <p id="vote-count">
                        {currentPost?.upvotes?.length -
                          currentPost?.downvotes?.length}
                      </p>
                    )}
                  </>
                )}
                {currentPost?.downvotes?.find((downvote) => {
                  return (
                    downvote?.toString() === loggedInUserInfo?._id?.toString()
                  );
                }) !== undefined ? (
                  <>
                    <ThumbDownAltOutlinedIcon
                      onClick={postDownvoteHandler}
                      className="vote-downvote-icon"
                      sx={{ color: "rgb(2,112,211)" }}
                    />
                  </>
                ) : (
                  <>
                    <ThumbDownAltOutlinedIcon
                      onClick={postDownvoteHandler}
                      className="vote-downvote-icon"
                      sx={{ color: "rgb(135, 138, 140)" }}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="post-right">
        <div className="level1">
          {type === "r" ? (
            <Avatar
              className="post-avatar"
              alt={currentPost?.postedForCommunity?.id?.communityName?.toUpperCase()}
              variant="circle"
              src={`${imageURL}/render/image/${currentPost?.postedForCommunity?.id?.communityPicture}`}
            />
          ) : (
            <Avatar
              className="post-avatar"
              alt={currentPost?.postedForUser?.id.username?.toUpperCase()}
              variant="circle"
              src={`${imageURL}/render/image/${currentPost?.postedForUser?.id?.picture}`}
            />
          )}

          {type === "r" && (
            <>
              <p onClick={communityNameHandler} id="post-username">
                r/{currentPost?.postedForCommunity?.id?.communityName}
              </p>
              <p id="dot">.</p>
            </>
          )}
          <p id="postedby">
            {type === "r" ? (
              <>Posted by</>
            ) : (
              <span style={{ marginLeft: "3px" }}>Posted by</span>
            )}{" "}
            <span onClick={usernameHandler} id="postedby-username">
              u/{currentPost?.postedBy?.id?.username}
            </span>{" "}
            {moment(currentPost?.createdAt).fromNow()}
          </p>
        </div>
        <div className="level2">
          <p id="post-title">{currentPost?.title}</p>
        </div>

        {currentPost?.postType === "text" ? (
          <div className="level3-text">
            <p>{currentPost?.text}</p>
          </div>
        ) : (
          <>
            {currentPost?.pictureWidth >= currentPost?.pictureHeight ||
            currentPost?.pictureHeight - currentPost?.pictureWidth <= 1000 ? (
              <div className="level3-image">
                <img
                  src={`${imageURL}/render/image/${currentPost?.picture}`}
                  alt="post"
                />
              </div>
            ) : (
              <>
                {currentPost?.pictureHeight - currentPost?.pictureWidth <=
                2000 ? (
                  <div className="level3-vertical-image">
                    <img
                      src={`${imageURL}/render/image/${currentPost?.picture}`}
                      alt="post"
                    />
                  </div>
                ) : (
                  <>
                    {" "}
                    {currentPost?.pictureHeight > currentPost?.pictureWidth ? (
                      <div className="level3-vertical2-image">
                        <img
                          src={`${imageURL}/render/image/${currentPost?.picture}`}
                          alt="post"
                        />
                      </div>
                    ) : null}
                  </>
                )}
              </>
            )}
          </>
        )}

        <div className="level4">
          <div className="level4-option">
            <AddCommentOutlinedIcon className="level4-icon" />
            &nbsp;
            <p className="level4-typo">
              {currentPost?.comments?.length} comments
            </p>
          </div>
          {/* <div className="level4-option">
            <CardGiftcardOutlinedIcon className="level4-icon" />
            &nbsp;<p className="level4-typo">Awards</p>
          </div> */}
          {userLoggedIn ? (
            <Tooltip title="this feature has not implemented yet">
              <div style={{ cursor: "default" }} className="level4-option">
                <BookmarkBorderOutlinedIcon className="level4-icon" />
                &nbsp;<p className="level4-typo">Save</p>
              </div>
            </Tooltip>
          ) : null}

          {userLoggedIn &&
          (currentPost?.postedBy?.id?._id?.toString() ===
            loggedInUserInfo?._id ||
            (currentPost?.postedForType === "community" &&
              currentPost?.postedForCommunity?.id?.createdBy?.id?.toString() ===
                loggedInUserInfo?._id) ||
            currentPost?.postedForCommunity?.id?.moderators?.some(
              (mod) =>
                mod?.id?.toString() === loggedInUserInfo?._id?.toString() &&
                mod?.permissions?.includes("post")
            )) ? (
            <>
              {postButtonLoader ? (
                <div style={{ cursor: "default" }} className="level4-option">
                  <DeleteOutlineOutlinedIcon
                    sx={{ color: "rgb(140,140,140)" }}
                    className="level4-icon"
                  />
                  &nbsp;
                  <p
                    style={{ color: "rgb(140,140,140)" }}
                    className="level4-typo"
                  >
                    Delete
                  </p>
                </div>
              ) : (
                <div
                  onClick={(e) => optionHandler("delete", e)}
                  className="level4-option"
                >
                  <DeleteOutlineOutlinedIcon className="level4-icon" />
                  &nbsp;<p className="level4-typo">Delete</p>
                </div>
              )}
            </>
          ) : null}

          {/* {userLoggedIn ? (
            <div>
              <div className="level4-option">
                <MoreHorizOutlinedIcon
                  id="basic-button"
                  aria-controls={optionOpen ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={optionOpen ? "true" : undefined}
                  onClick={handleOptionPopupOpen}
                  className="level4-icon"
                />
              </div>
              <Menu
                id="basic-menu"
                anchorEl={optionPopup}
                open={optionOpen}
                onClose={handleOptionPopupClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {postButtonLoader ? (
                  <>
                    <MenuItem disabled>Delete</MenuItem>
                    <MenuItem disabled>Save</MenuItem>
                  </>
                ) : (
                  <>
                    {userLoggedIn &&
                    (currentPost?.postedBy?.id?._id?.toString() ===
                      loggedInUserInfo?._id ||
                      (currentPost?.postedForType === "community" &&
                        currentPost?.postedForCommunity?.id?.createdBy?.id.toString() ===
                          loggedInUserInfo?._id) ||
                      currentPost?.postedForCommunity?.id?.moderators?.some(
                        (mod) =>
                          mod?.id?.toString() ===
                            loggedInUserInfo?._id.toString() &&
                          mod?.permissions.includes("post")
                      )) ? (
                      <MenuItem onClick={(e) => optionHandler("delete", e)}>
                        Delete
                      </MenuItem>
                    ) : null}
                    <MenuItem>Save</MenuItem>
                  </>
                )}
              </Menu>
            </div>
          ) : null} */}
        </div>
        {comment ? (
          <>
            <div className="level5">
              {userLoggedIn ? (
                <p>
                  Comment as{" "}
                  <span style={{ color: "red" }}>
                    {loggedInUserInfo?.username}
                  </span>
                </p>
              ) : null}

              <textarea
                id="comment-textarea"
                placeholder="What are your thoughts?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              {commentButtonLoader ? (
                <Button
                  color="error"
                  size="small"
                  sx={{ marginTop: "10px" }}
                  variant="contained"
                  disabled
                >
                  Comment
                </Button>
              ) : (
                <Button
                  color="error"
                  size="small"
                  sx={{ marginTop: "10px" }}
                  variant="contained"
                  onClick={commentHandler}
                >
                  Comment
                </Button>
              )}

              <hr id="comment-line" />
            </div>
            {currentPost?.comments
              ?.slice(0)
              ?.reverse()
              ?.map((comment, index) => {
                return (
                  <PostComment
                    loggedInUserInfo={loggedInUserInfo}
                    key={index}
                    userLoggedIn={userLoggedIn}
                    comment={comment}
                    commentText={commentText}
                    setCommentText={setCommentText}
                    commentLikeLoader={commentLikeLoader}
                    upDownVoteCommentId={upDownVoteCommentId}
                    commentUpvoteHandler={commentUpvoteHandler}
                    commentDownvoteHandler={commentDownvoteHandler}
                    commentUsernameHandler={commentUsernameHandler}
                    replyHandler={replyHandler}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    replyButtonLoader={replyButtonLoader}
                    replyTextarea={replyTextarea}
                    setReplyTextarea={setReplyTextarea}
                    commentDeleteButtonLoader={commentDeleteButtonLoader}
                    commentDeleteHandler={commentDeleteHandler}
                    commentDeleteId={commentDeleteId}
                  />
                );
              })}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Post;
