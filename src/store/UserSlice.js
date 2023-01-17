import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  registerUser,
  loginUser,
  loggedInUserInformation,
  logoutUser,
  userUpdateInfo,
  userUnfollow,
  getUserByName,
  userFollow,
  uploadProfilePictureTempImage,
  deleteUserImage,
  searchUsersAndCommunities,
  answerInviteRequest,
} from "./UserAction";

const initialState = {
  userCreated: false,
  userLoggedIn: localStorage.getItem("token") === null ? false : true,
  userButtonLoader: false,
  userScreenLoader: true,
  loggedInUserInfo:
    localStorage.getItem("loggedInUserInfo") === null
      ? {}
      : JSON.parse(localStorage.getItem("loggedInUserInfo")),
  userAuth: false,
  userLoggedOut: false,
  dropdownTitle: {},
  userFollowed: false,
  userUnfollowed: false,
  currentUser: {},
  createPostDropdownTitle: {},
  userUpdated: false,
  userTempImageUpload: false,
  userTempImageInfo: {},
  userInfoUpdate: false,
  notifications: [],
  searchCommunities: [],
  searchUsers: [],
  searchLoader: false,
  notificationButtonLoader: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserButtonLoaderValue: (state, action) => {
      state.userButtonLoader = true;
    },
    updateUserCreatedValue: (state, action) => {
      state.userCreated = false;
    },
    updateUserScreenLoaderValue: (state, action) => {
      state.userScreenLoader = true;
    },
    updateUserAuthValue: (state, action) => {
      state.userAuth = false;
    },
    updateUserLoggedOutValue: (state, action) => {
      state.userLoggedOut = false;
    },
    updateUserFollowValue: (state, action) => {
      state.userFollowed = false;
    },
    updateUserUnfollowValue: (state, action) => {
      state.userUnfollowed = false;
    },
    userAuthError: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("loggedInUserInfo");
      localStorage.removeItem("userFollowCommunities");
      localStorage.removeItem("userCreatedCommunities");
      localStorage.removeItem("userModCommunities");
      localStorage.removeItem("communityId");
      state.userLoggedIn = false;
      state.userAuth = true;
    },
    updateDropdownTitleValue: (state, action) => {
      state.dropdownTitle = {
        name: action.payload.name,
        image: action.payload.image,
        type: action.payload.type,
      };
    },
    updateCreatePostDropdownTitleValue: (state, action) => {
      if (Object.keys(action.payload).length !== 0) {
        state.createPostDropdownTitle = {
          id: action.payload._id,
          image: action.payload.image,
          name: action.payload.name,
          type: action.payload.type,
        };
      } else {
        state.createPostDropdownTitle = {};
      }
    },
    updateUserPostsArray: (state, action) => {
      if (Object.keys(current(state.currentUser)).length !== 0) {
        const findPostIndex = current(state.currentUser).posts.findIndex(
          (post) => {
            return (
              post.id._id.toString() === action.payload.data.data._id.toString()
            );
          }
        );
        if (findPostIndex !== -1)
          state.currentUser.posts[findPostIndex].id = action.payload.data.data;
      }
    },
    updateUserInfoUpdate: (state, action) => {
      state.userInfoUpdate = false;
    },
    updateLoggedInUserValue: (state, action) => {
      state.loggedInUserInfo = action.payload;
    },
    updateCurrentUserPostsArray: (state, action) => {
      if (Object.keys(state.currentUser).length !== 0) {
        state.currentUser.posts = state.currentUser.posts.filter((post) => {
          return post.id._id.toString() !== action.payload.data.data._id;
        });
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      console.log("pending");
    },
    [registerUser.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.userCreated = true;
      }
      state.userButtonLoader = false;
    },
    [registerUser.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.userButtonLoader = false;
    },
    [loginUser.pending]: (state, action) => {
      console.log("pending");
    },
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.userLoggedIn = true;
        state.loggedInUserInfo = action.payload.data.data;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("userId", action.payload.data.data._id);
        localStorage.setItem(
          "loggedInUserInfo",
          JSON.stringify(action.payload.data.data)
        );
      }
      state.userButtonLoader = false;
    },
    [loginUser.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.userButtonLoader = false;
    },
    [loggedInUserInformation.pending]: (state, action) => {
      console.log("pending");
    },
    [loggedInUserInformation.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.notifications = action.payload.data.data.notifications;
        state.loggedInUserInfo = action.payload.data.data;
        localStorage.setItem(
          "loggedInUserInfo",
          JSON.stringify(action.payload.data.data)
        );
      } else if (action.payload.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUserInfo");
        localStorage.removeItem("userFollowCommunities");
        localStorage.removeItem("userCreatedCommunities");
        localStorage.removeItem("userModCommunities");
        localStorage.removeItem("communityId");
        state.userLoggedIn = false;
        state.userAuth = true;
      }
      state.userScreenLoader = false;
    },
    [loggedInUserInformation.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.userScreenLoader = false;
    },

    [logoutUser.pending]: (state, action) => {
      console.log("pending");
    },
    [logoutUser.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUserInfo");
        localStorage.removeItem("userFollowCommunities");
        localStorage.removeItem("userCreatedCommunities");
        localStorage.removeItem("userModCommunities");
        localStorage.removeItem("communityId");
        state.userLoggedIn = false;
        state.userLoggedOut = true;
      } else if (action.payload.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUserInfo");
        localStorage.removeItem("userFollowCommunities");
        localStorage.removeItem("userCreatedCommunities");
        localStorage.removeItem("userModCommunities");
        localStorage.removeItem("communityId");
        state.userLoggedIn = false;
        state.userAuth = true;
      }
    },
    [logoutUser.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
    },
    [getUserByName.pending]: (state, action) => {
      console.log("pending");
    },
    [getUserByName.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.currentUser = action.payload.data.data;
      }
      state.userScreenLoader = false;
    },
    [getUserByName.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.userScreenLoader = false;
    },
    [userFollow.pending]: (state, action) => {
      console.log("pending");
      state.userButtonLoader = true;
    },
    [userFollow.fulfilled]: (state, action) => {
      if (action.payload.status === 204) {
        state.userFollowed = true;
      } else if (action.payload.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUserInfo");
        localStorage.removeItem("userFollowCommunities");
        localStorage.removeItem("userCreatedCommunities");
        localStorage.removeItem("userModCommunities");
        localStorage.removeItem("communityId");
        state.userLoggedIn = false;
        state.userAuth = true;
      }
      state.userButtonLoader = false;
    },
    [userFollow.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.userButtonLoader = false;
    },
    [userUnfollow.pending]: (state, action) => {
      console.log("pending");
      state.userButtonLoader = true;
    },
    [userUnfollow.fulfilled]: (state, action) => {
      if (action.payload.status === 204) {
        state.userUnfollowed = true;
      } else if (action.payload.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUserInfo");
        localStorage.removeItem("userFollowCommunities");
        localStorage.removeItem("userCreatedCommunities");
        localStorage.removeItem("userModCommunities");
        localStorage.removeItem("communityId");
        state.userLoggedIn = false;
        state.userAuth = true;
      }
      state.userButtonLoader = false;
    },
    [userUnfollow.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.userButtonLoader = false;
    },
    [uploadProfilePictureTempImage.pending]: (state, action) => {
      console.log("pending");
      state.userButtonLoader = true;
    },
    [uploadProfilePictureTempImage.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.userTempImageUpload = true;
        state.userTempImageInfo = action.payload.data.data;
      } else if (action.payload.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUserInfo");
        localStorage.removeItem("userFollowCommunities");
        localStorage.removeItem("userCreatedCommunities");
        localStorage.removeItem("userModCommunities");
        localStorage.removeItem("communityId");
        state.userLoggedIn = false;
        state.userAuth = true;
      }
      state.userButtonLoader = false;
    },
    [uploadProfilePictureTempImage.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.userButtonLoader = false;
    },
    [deleteUserImage.pending]: (state, action) => {
      console.log("pending");
      state.userButtonLoader = true;
    },
    [deleteUserImage.fulfilled]: (state, action) => {
      if (action.payload.status === 204) {
        state.userTempImageUpload = false;
        state.userTempImageInfo = {};
      } else if (action.payload.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUserInfo");
        localStorage.removeItem("userFollowCommunities");
        localStorage.removeItem("userCreatedCommunities");
        localStorage.removeItem("userModCommunities");
        localStorage.removeItem("communityId");
        state.userLoggedIn = false;
        state.userAuth = true;
      }
      state.userButtonLoader = false;
    },
    [deleteUserImage.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.userButtonLoader = false;
    },
    [userUpdateInfo.pending]: (state, action) => {
      console.log("pending");
      state.userButtonLoader = true;
    },
    [userUpdateInfo.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.loggedInUserInfo = action.payload.data.data;
        state.dropdownTitle = {
          image: action.payload.data.data.picture,
        };
        state.currentUser = action.payload.data.data;
        state.userTempImageInfo = {};
        state.userTempImageUpload = false;
        state.userInfoUpdate = true;
      } else if (action.payload.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUserInfo");
        localStorage.removeItem("userFollowCommunities");
        localStorage.removeItem("userCreatedCommunities");
        localStorage.removeItem("userModCommunities");
        localStorage.removeItem("communityId");
        state.userLoggedIn = false;
        state.userAuth = true;
      }
      state.userButtonLoader = false;
    },
    [userUpdateInfo.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.userButtonLoader = false;
    },
    [searchUsersAndCommunities.pending]: (state, action) => {
      console.log("pending");
      state.searchLoader = true;
    },
    [searchUsersAndCommunities.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.searchUsers = action.payload.data.data.findUsers;
        state.searchCommunities = action.payload.data.data.findCommunities;
      }
      state.searchLoader = false;
    },
    [searchUsersAndCommunities.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.searchLoader = false;
    },
    [answerInviteRequest.pending]: (state, action) => {
      console.log("pending");
      state.notificationButtonLoader = true;
    },
    [answerInviteRequest.fulfilled]: (state, action) => {
      if (action.payload.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUserInfo");
        localStorage.removeItem("userFollowCommunities");
        localStorage.removeItem("userCreatedCommunities");
        localStorage.removeItem("userModCommunities");
        localStorage.removeItem("communityId");
        state.userLoggedIn = false;
        state.userAuth = true;
      }
      state.notificationButtonLoader = false;
    },
    [answerInviteRequest.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.notificationButtonLoader = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
