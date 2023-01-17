import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createComment,
  likeComment,
  dislikeComment,
  createReply,
  deleteComment,
} from "./CommentAction";

const initialState = {
  commentLikeLoader: false,
  commentCreated: false,
  replyCreated: false,
  commentButtonLoader: false,
  replyButtonLoader: false,
  upDownVoteCommentId: "",
  commentDeleteId: "",
  commentDeleteButtonLoader: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    updateUpDownVoteCommentIdValue: (state, action) => {
      state.upDownVoteCommentId = action.payload;
    },
    updateCommentDeleteIdValue: (state, action) => {
      state.commentDeleteId = action.payload;
    },
    updateCommentCreatedValue: (state, action) => {
      state.commentCreated = false;
    },
    updateReplyCreatedValue: (state, action) => {
      state.replyCreated = false;
    },
  },
  extraReducers: {
    [createComment.pending]: (state, action) => {
      state.commentButtonLoader = true;
      console.log("pending");
    },
    [createComment.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.commentCreated = true;
      }
      state.commentButtonLoader = false;
    },
    [createComment.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.commentButtonLoader = false;
    },
    [likeComment.pending]: (state, action) => {
      state.commentLikeLoader = true;
      console.log("pending");
    },
    [likeComment.fulfilled]: (state, action) => {
      state.commentLikeLoader = false;
    },
    [likeComment.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.commentLikeLoader = false;
    },
    [dislikeComment.pending]: (state, action) => {
      state.commentLikeLoader = true;
      console.log("pending");
    },
    [dislikeComment.fulfilled]: (state, action) => {
      state.commentLikeLoader = false;
    },
    [dislikeComment.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.commentLikeLoader = false;
    },
    [createReply.pending]: (state, action) => {
      state.replyButtonLoader = true;
      console.log("pending");
    },
    [createReply.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.replyCreated = true;
      }
      state.replyButtonLoader = false;
    },
    [createReply.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.replyButtonLoader = false;
    },
    [deleteComment.pending]: (state, action) => {
      state.commentDeleteButtonLoader = true;
      console.log("pending");
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.commentDeleteButtonLoader = false;
    },
    [deleteComment.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.commentDeleteButtonLoader = false;
    },
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice;
