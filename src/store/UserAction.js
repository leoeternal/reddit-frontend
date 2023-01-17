import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../helper/axiosInstance";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/register", data);
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

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const fetchData = () => {
    const response = axios.post("/login", data);
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

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const fetchData = () => {
    const response = axios.get("/logout", {
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
    toast.error(error.response.data.message);
    return error.response;
  }
});

export const loggedInUserInformation = createAsyncThunk(
  "user/loggedInUserInformation",
  async () => {
    const fetchData = () => {
      const response = axios.get("/loggeduser/info", {
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
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);

export const getUserByName = createAsyncThunk(
  "user/getUserByName",
  async (name) => {
    const fetchData = () => {
      const response = axios.get(`/user/${name}`);
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

export const userFollow = createAsyncThunk("user/userFollow", async (data) => {
  const fetchData = () => {
    const response = axios.patch("/user/follow", data, {
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
    toast.error(error.response.data.message);
    return error.response;
  }
});

export const userUnfollow = createAsyncThunk(
  "user/userUnfollow",
  async (data) => {
    const fetchData = () => {
      const response = axios.patch("/user/unfollow", data, {
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
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);

export const userUpdateInfo = createAsyncThunk(
  "user/userUpdateInfo",
  async (data) => {
    const fetchData = () => {
      const response = axios.patch("/user/info/update", data, {
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
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);

export const uploadProfilePictureTempImage = createAsyncThunk(
  "user/uploadProfilePictureTempImage",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/user/image/upload", data, {
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
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);

export const deleteUserImage = createAsyncThunk(
  "user/deleteUserImage",
  async (data) => {
    const fetchData = () => {
      const response = axios.delete(
        `/user/image/delete/${data.filename}/${data.fileId}`,
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
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);

export const searchUsersAndCommunities = createAsyncThunk(
  "user/searchUsersAndCommunities",
  async (query) => {
    const fetchData = () => {
      const response = axios.get(`/search/${query}`);
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

export const answerInviteRequest = createAsyncThunk(
  "community/answerInviteRequest",
  async (data) => {
    const fetchData = () => {
      const response = axios.patch(`/answer/invite/request/`, data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 200) {
        toast.success(data.data.message);
      }
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.response;
    }
  }
);
