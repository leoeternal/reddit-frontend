import { Avatar, Button } from "@mui/material";
import React from "react";
import moment from "moment";
import "./postComment.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

function PostComment({
  comment,
  commentLikeLoader,
  upDownVoteCommentId,
  userLoggedIn,
  loggedInUserInfo,
  commentUpvoteHandler,
  commentDownvoteHandler,
  commentUsernameHandler,
  commentText,
  setCommentText,
  replyHandler,
  replyText = "",
  setReplyText,
  replyButtonLoader,
  replyTextarea,
  setReplyTextarea,
  commentDeleteButtonLoader,
  commentDeleteHandler,
  commentDeleteId,
}) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  return (
    <div className="level6">
      <Avatar
        id="comment-avatar"
        alt={comment?.postedBy?.username?.toUpperCase()}
        variant="circle"
        src={`${imageURL}/render/image/${comment?.postedBy?.picture}`}
      />
      <div className="comment-container">
        <div className="name-time-container">
          <p
            onClick={(e) =>
              commentUsernameHandler(e, comment?.postedBy?.username)
            }
            id="comment-username"
          >
            {comment?.postedBy?.username}
          </p>
          <p id="comment-time">{moment(comment?.createdAt).fromNow()}</p>
        </div>
        <div className="comment-text-container">
          <p id="comment-text">{comment?.text}</p>
        </div>
        <div className="like-dislike-option-container">
          {commentLikeLoader && comment?._id === upDownVoteCommentId ? (
            <>
              <ThumbUpAltOutlinedIcon
                id="comment-updownvotes-avatar"
                sx={{
                  color: "rgb(200,200,200)",
                  padding: "5px 2px",
                  fontSize: "23px",
                }}
              />
              <p id="comment-updownvotes">
                {comment?.upvotes?.length - comment?.downvotes?.length}
              </p>
              <ThumbDownAltOutlinedIcon
                id="comment-updownvotes-avatar"
                sx={{
                  color: "rgb(200,200,200)",
                  padding: "5px 2px",
                  fontSize: "23px",
                }}
              />
            </>
          ) : (
            <>
              {!userLoggedIn ? (
                <>
                  <ThumbUpAltOutlinedIcon
                    id="comment-updownvotes-avatar"
                    onClick={(e) => commentUpvoteHandler(e, comment?._id)}
                    sx={{
                      color: "rgb(132, 132, 132)",
                      padding: "5px 2px",
                      fontSize: "23px",
                    }}
                  />
                  <p id="comment-updownvotes">
                    {comment?.upvotes?.length - comment?.downvotes?.length}
                  </p>
                  <ThumbDownAltOutlinedIcon
                    id="comment-updownvotes-avatar"
                    onClick={(e) => commentDownvoteHandler(e, comment?._id)}
                    sx={{
                      color: "rgb(132, 132, 132)",
                      padding: "5px 2px",
                      fontSize: "23px",
                    }}
                  />
                </>
              ) : (
                <>
                  {comment?.upvotes?.find((upvote) => {
                    return (
                      upvote?.toString() === loggedInUserInfo?._id?.toString()
                    );
                  }) !== undefined ? (
                    <ThumbUpAltOutlinedIcon
                      onClick={(e) => commentUpvoteHandler(e, comment?._id)}
                      id="comment-updownvotes-avatar"
                      sx={{
                        color: "rgb(243, 100, 100)",
                        padding: "5px 2px",
                        fontSize: "23px",
                      }}
                    />
                  ) : (
                    <ThumbUpAltOutlinedIcon
                      onClick={(e) => commentUpvoteHandler(e, comment?._id)}
                      id="comment-updownvotes-avatar"
                      sx={{
                        color: "rgb(132, 132, 132)",
                        padding: "5px 2px",
                        fontSize: "23px",
                      }}
                    />
                  )}

                  {comment?.downvotes?.find((downvote) => {
                    return (
                      downvote?.toString() === loggedInUserInfo?._id?.toString()
                    );
                  }) !== undefined ? (
                    <p style={{ color: "rgb(2,112,211)" }} id="vote-count">
                      {comment?.upvotes?.length - comment?.downvotes?.length}
                    </p>
                  ) : (
                    <>
                      {comment?.upvotes?.find((upvote) => {
                        return (
                          upvote?.toString() ===
                          loggedInUserInfo?._id?.toString()
                        );
                      }) !== undefined ? (
                        <p
                          style={{ color: "rgb(243, 100, 100)" }}
                          id="vote-count"
                        >
                          {comment?.upvotes?.length -
                            comment?.downvotes?.length}
                        </p>
                      ) : (
                        <p id="vote-count">
                          {comment?.upvotes?.length -
                            comment?.downvotes?.length}
                        </p>
                      )}
                    </>
                  )}

                  {comment?.downvotes?.find((downvote) => {
                    return (
                      downvote?.toString() === loggedInUserInfo?._id?.toString()
                    );
                  }) !== undefined ? (
                    <>
                      <ThumbDownAltOutlinedIcon
                        onClick={(e) => commentDownvoteHandler(e, comment?._id)}
                        id="comment-updownvotes-avatar"
                        sx={{
                          color: "rgb(2,112,211)",
                          padding: "5px 2px",
                          fontSize: "23px",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <ThumbDownAltOutlinedIcon
                        onClick={(e) => commentDownvoteHandler(e, comment?._id)}
                        id="comment-updownvotes-avatar"
                        sx={{
                          color: "rgb(132, 132, 132)",
                          padding: "5px 2px",
                          fontSize: "23px",
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
          {comment?.comment === undefined ? (
            <p
              onClick={() => setReplyTextarea(comment?._id)}
              id="option"
              style={{ marginLeft: "10px" }}
            >
              Reply
            </p>
          ) : null}

          {/* <p id="option">Save</p> */}
          {/* <p id="option">Give Award</p> */}
          {commentDeleteButtonLoader &&
          commentDeleteId?.toString() === comment?._id?.toString() ? (
            <p
              style={{ color: "rgb(171,171,171)", cursor: "default" }}
              id="option"
            >
              Delete
            </p>
          ) : (
            <>
              {userLoggedIn &&
              (comment?.postedBy?._id?.toString() ===
                loggedInUserInfo?._id?.toString() ||
                comment?.post?.postedBy?.id?._id?.toString() ===
                  loggedInUserInfo?._id?.toString() ||
                (comment?.post?.postedForType === "community" &&
                  comment?.post?.postedForCommunity?.id?.createdBy?.id?.toString() ===
                    loggedInUserInfo?._id?.toString()) ||
                comment?.post?.postedForCommunity?.id?.moderators?.some(
                  (mod) =>
                    mod?.id?.toString() === loggedInUserInfo?._id?.toString() &&
                    mod?.permissions?.includes("comment")
                ) ||
                (comment?.comment !== undefined &&
                  comment?.comment?.replies?.some(
                    (reply) =>
                      reply?.toString() === comment?._id?.toString() &&
                      comment?.comment?.postedBy?.toString() ===
                        loggedInUserInfo?._id?.toString()
                  ))) ? (
                <p
                  onClick={() => commentDeleteHandler(comment?._id)}
                  id="option"
                >
                  Delete
                </p>
              ) : null}
            </>
          )}
        </div>
        {replyTextarea !== "" && replyTextarea === comment?._id ? (
          <div className="level-5">
            <textarea
              id="comment-textarea"
              placeholder="What are your thoughts?"
              value={replyText}
              onChange={(e) => {
                setReplyText(e.target.value);
              }}
            ></textarea>
            {replyButtonLoader ? (
              <Button
                color="error"
                size="small"
                sx={{ marginTop: "10px" }}
                variant="contained"
                disabled
              >
                Reply
              </Button>
            ) : (
              <Button
                color="error"
                size="small"
                sx={{ marginTop: "10px" }}
                variant="contained"
                onClick={() => replyHandler(comment._id)}
              >
                Reply
              </Button>
            )}
          </div>
        ) : null}

        <div className="replies">
          {comment?.replies?.map((reply, index) => {
            return (
              <PostComment
                loggedInUserInfo={loggedInUserInfo}
                key={index}
                userLoggedIn={userLoggedIn}
                comment={reply}
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
                replyTextarea={replyTextarea}
                setReplyTextarea={setReplyTextarea}
                commentDeleteButtonLoader={commentDeleteButtonLoader}
                commentDeleteHandler={commentDeleteHandler}
                commentDeleteId={commentDeleteId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostComment;
