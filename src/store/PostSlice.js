import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createPost,
  getPostById,
  getAllPostsOfLoggedInUser,
  getAllPosts,
  dislikePost,
  likePost,
  uploadTempImage,
  deleteImage,
  deletePost,
} from "./PostAction";

const initialState = {
  postButtonLoader: false,
  postScreenLoader: false,
  postCreated: false,
  currentPost: {},
  posts: [],
  postFetched: false,
  postLikedLoader: false,
  upDownVotePostId: "",
  tempImageUpload: false,
  tempImageInfo: {},
  postDeleted: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePostButtonLoaderValue: (state, action) => {
      state.postButtonLoader = true;
    },
    updatePostCreatedValue: (state, action) => {
      state.postCreated = false;
    },
    updatePostScreenLoaderValue: (state, action) => {
      state.postScreenLoader = true;
    },
    updatePostFetchedValue: (state, action) => {
      state.postFetched = false;
    },
    updateUpDownVotePostIdValue: (state, action) => {
      state.upDownVotePostId = action.payload;
    },
    updatePostArrayForCommentCreated: (state, action) => {
      state.currentPost.comments.push(action.payload.data.data);
    },
    updatePostArrayForReplyCreated: (state, action) => {
      const findCommentIndex = current(state.currentPost.comments).findIndex(
        (comment) => {
          return (
            comment._id.toString() ===
            action.payload.data.data.commentId.toString()
          );
        }
      );
      if (findCommentIndex !== -1) {
        state.currentPost.comments[findCommentIndex].replies.unshift(
          action.payload.data.data.replyData
        );
      }
    },
    updateCurrentPostForCommentLikeDisike: (state, action) => {
      const findCommentIndex = current(state.currentPost.comments).findIndex(
        (comment) => {
          return comment._id.toString() === action?.payload?._id?.toString();
        }
      );
      const findCommentIndexForReply = current(
        state?.currentPost?.comments
      ).findIndex((comment) => {
        return (
          comment?._id?.toString() === action?.payload?.comment?._id.toString()
        );
      });
      if (findCommentIndexForReply !== -1) {
        const findReplyIndex = current(
          state?.currentPost?.comments[findCommentIndexForReply].replies
        ).findIndex((reply) => {
          return reply._id.toString() === action?.payload?._id?.toString();
        });
        if (findReplyIndex !== -1) {
          state.currentPost.comments[findCommentIndexForReply].replies[
            findReplyIndex
          ] = action.payload;
        }
      } else {
        if (findCommentIndex !== -1) {
          state.currentPost.comments[findCommentIndex] = action.payload;
        }
      }
    },
    updatePostDeletedVaue: (state, action) => {
      state.postDeleted = false;
    },
    updatePostForDeletedComment: (state, action) => {
      if (action.payload.data.data.type === "comment") {
        state.currentPost.comments = current(state.currentPost.comments).filter(
          (comment) => {
            return (
              comment._id.toString() !==
              action.payload.data.data.commentId.toString()
            );
          }
        );
      } else if (action.payload.data.data.type === "reply") {
        const findCommentIndex = current(state.currentPost.comments).findIndex(
          (comment) => {
            return (
              comment._id.toString() ===
              action.payload.data.data.commentId.toString()
            );
          }
        );
        state.currentPost.comments[findCommentIndex].replies =
          action.payload.data.data.repliesArray;
      }
    },
  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      console.log("pending");
    },
    [createPost.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.postCreated = true;
        state.currentPost = action.payload.data.data;
        state.tempImageInfo = {};
        state.tempImageUpload = false;
      }
      state.postButtonLoader = false;
    },
    [createPost.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.postButtonLoader = false;
    },
    [getPostById.pending]: (state, action) => {
      console.log("pending");
    },
    [getPostById.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.currentPost = action.payload.data.data;
        state.postFetched = true;
      }
      state.postScreenLoader = false;
    },
    [getPostById.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.postScreenLoader = false;
    },
    [getAllPostsOfLoggedInUser.pending]: (state, action) => {
      console.log("pending");
    },
    [getAllPostsOfLoggedInUser.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.posts = action.payload.data.data;
      }
      state.postScreenLoader = false;
    },
    [getAllPostsOfLoggedInUser.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.postScreenLoader = false;
    },
    [getAllPosts.pending]: (state, action) => {
      console.log("pending");
    },
    [getAllPosts.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.posts = action.payload.data.data;
      }
      state.postScreenLoader = false;
    },
    [getAllPosts.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.postScreenLoader = false;
    },
    [likePost.pending]: (state, action) => {
      state.postLikedLoader = true;
      console.log("pending");
    },
    [likePost.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        const findPostIndex = current(state.posts).findIndex((post) => {
          return (
            post._id.toString() === action.payload.data.data._id.toString()
          );
        });
        if (findPostIndex !== -1)
          state.posts[findPostIndex] = action.payload.data.data;
        state.currentPost = action.payload.data.data;
      }
      state.postLikedLoader = false;
    },
    [likePost.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.postLikedLoader = false;
    },
    [dislikePost.pending]: (state, action) => {
      state.postLikedLoader = true;
      console.log("pending");
    },
    [dislikePost.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        const findPostIndex = current(state.posts).findIndex((post) => {
          return (
            post._id.toString() === action.payload.data.data._id.toString()
          );
        });
        if (findPostIndex !== -1)
          state.posts[findPostIndex] = action.payload.data.data;
        state.currentPost = action.payload.data.data;
      }
      state.postLikedLoader = false;
    },
    [dislikePost.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.postLikedLoader = false;
    },
    [uploadTempImage.pending]: (state, action) => {
      console.log("pending");
      state.postButtonLoader = true;
    },
    [uploadTempImage.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.tempImageUpload = true;
        state.tempImageInfo = action.payload.data.data;
      }
      state.postButtonLoader = false;
    },
    [uploadTempImage.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.postButtonLoader = false;
    },
    [deleteImage.pending]: (state, action) => {
      console.log("pending");
      state.postButtonLoader = true;
    },
    [deleteImage.fulfilled]: (state, action) => {
      if (action.payload.status === 204) {
        state.tempImageUpload = false;
        state.tempImageInfo = {};
      }
      state.postButtonLoader = false;
    },
    [deleteImage.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.postButtonLoader = false;
    },
    [deletePost.pending]: (state, action) => {
      console.log("pending");
      state.postButtonLoader = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.currentPost = {};
        state.posts = state.posts.filter((post) => {
          return (
            post._id.toString() !== action.payload.data.data._id.toString()
          );
        });
        state.postDeleted = true;
      }
      state.postButtonLoader = false;
    },
    [deletePost.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.postButtonLoader = false;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice;
