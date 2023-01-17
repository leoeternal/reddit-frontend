import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../helper/axiosInstance";
import { userActions } from "./UserSlice";

export const createCommunity = createAsyncThunk(
  "community/createCommunity",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.post("/community", data, {
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

export const getCommunityByName = createAsyncThunk(
  "community/getCommunityByName",
  async (name) => {
    const fetchData = () => {
      const response = axios.get(`/community/${name}`);
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);

export const getAllCommunitiesOfUser = createAsyncThunk(
  "community/getAllCommunitiesOfUser",
  async (thunkAPI) => {
    const fetchData = () => {
      const response = axios.get("/communities/user", {
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

export const communityFollow = createAsyncThunk(
  "community/communityFollow",
  async (communityId, thunkAPI) => {
    const fetchData = () => {
      const response = axios.patch("/community/follow", communityId, {
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

export const communityUnfollow = createAsyncThunk(
  "community/communityUnfollow",
  async (communityId, thunkAPI) => {
    const fetchData = () => {
      const response = axios.patch("/community/unfollow", communityId, {
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

export const topCommunities = createAsyncThunk(
  "community/topCommunities",
  async () => {
    const fetchData = () => {
      const response = axios.get(`/top/communities`);
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);

export const communityUpdateInfo = createAsyncThunk(
  "community/communityUpdateInfo",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.patch(
        `/community/info/update/${data.communityId}`,
        data.updateData,
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

export const inviteUserForMod = createAsyncThunk(
  "community/inviteUserForMod",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.patch("/invite/mod", data, {
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

export const deleteInvitedRequestToUser = createAsyncThunk(
  "community/deleteInvitedRequestToUser",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.delete(`/delete/invite/request`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        data: {
          data,
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

export const uploadCommunityProfilePictureTempImage = createAsyncThunk(
  "community/uploadCommunityProfilePictureTempImage",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.post("/community/image/upload", data, {
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

export const deleteCommunityImage = createAsyncThunk(
  "community/deleteCommunityImage",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.delete(
        `/community/image/delete/${data.filename}/${data.fileId}`,
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

export const leaveMod = createAsyncThunk(
  "community/leaveMod",
  async (communityId, thunkAPI) => {
    const fetchData = () => {
      const response = axios.patch(
        `/leave/mod/${communityId}`,
        { data: "" },
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
