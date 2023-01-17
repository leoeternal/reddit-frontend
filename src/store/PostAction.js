import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../helper/axiosInstance";
import { communityActions } from "./CommunitySlice";
import { userActions } from "./UserSlice";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.post("/post", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
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

export const getPostById = createAsyncThunk("post/getPostById", async (id) => {
  const fetchData = () => {
    const response = axios.get(`/post/${id}`);
    return response;
  };
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response;
  }
});

export const getAllPostsOfLoggedInUser = createAsyncThunk(
  "post/getAllPostsOfLoggedInUser",
  async (thunkAPI) => {
    const fetchData = () => {
      const response = axios.get("/posts/loggedInUser", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
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

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  const fetchData = () => {
    const response = axios.get("/posts");
    return response;
  };
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response;
  }
});

export const likePost = createAsyncThunk(
  "post/likePost",
  async (postId, thunkAPI) => {
    const fetchData = () => {
      const response = axios.get(`/post/like/${postId}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 200) {
        thunkAPI.dispatch(userActions.updateUserPostsArray(data));
        thunkAPI.dispatch(communityActions.updateCommunityPostsArray(data));
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

export const dislikePost = createAsyncThunk(
  "post/dislikePost",
  async (postId, thunkAPI) => {
    const fetchData = () => {
      const response = axios.get(`/post/dislike/${postId}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 200) {
        thunkAPI.dispatch(userActions.updateUserPostsArray(data));
        thunkAPI.dispatch(communityActions.updateCommunityPostsArray(data));
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

export const uploadTempImage = createAsyncThunk(
  "post/uploadTempImage",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.post("/image/upload", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
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

export const deleteImage = createAsyncThunk(
  "post/deleteImage",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.delete(
        `/image/delete/${data.filename}/${data.fileId}`,
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

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.delete(`/post/${data.postId}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 200) {
        thunkAPI.dispatch(
          communityActions.updateCurrentCommunityPostsArray(data)
        );
        thunkAPI.dispatch(userActions.updateCurrentUserPostsArray(data));
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
