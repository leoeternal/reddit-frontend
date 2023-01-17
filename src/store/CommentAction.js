import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../helper/axiosInstance";
import { postActions } from "./PostSlice";
import { userActions } from "./UserSlice";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.post("/comment", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 201) {
        thunkAPI.dispatch(postActions.updatePostArrayForCommentCreated(data));
      }
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(userActions.userAuthError());
      } else {
        toast.error(error.response.data.message);
      }
      return error.response;
    }
  }
);

export const likeComment = createAsyncThunk(
  "comment/likeComment",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.get(
        `/post/${data.currentPostId}/comment/${data.commentId}/like`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 200) {
        thunkAPI.dispatch(
          postActions.updateCurrentPostForCommentLikeDisike(data.data.data)
        );
      }
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(userActions.userAuthError());
      } else {
        toast.error(error.response.data.message);
      }
      return error.response;
    }
  }
);

export const dislikeComment = createAsyncThunk(
  "comment/dislikeComment",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.get(
        `/post/${data.currentPostId}/comment/${data.commentId}/dislike`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 200) {
        thunkAPI.dispatch(
          postActions.updateCurrentPostForCommentLikeDisike(data.data.data)
        );
      }
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(userActions.userAuthError());
      } else {
        toast.error(error.response.data.message);
      }
      return error.response;
    }
  }
);

export const createReply = createAsyncThunk(
  "comment/createReply",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.post("/reply", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 201) {
        thunkAPI.dispatch(postActions.updatePostArrayForReplyCreated(data));
      }
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(userActions.userAuthError());
      } else {
        toast.error(error.response.data.message);
      }
      return error.response;
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.delete(
        `/comment/${data.postId}/${data.commentId}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 200) {
        thunkAPI.dispatch(postActions.updatePostForDeletedComment(data));
      }
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(userActions.userAuthError());
      } else {
        toast.error(error.response.data.message);
      }
      return error.response;
    }
  }
);
