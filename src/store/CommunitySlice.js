import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createCommunity,
  getCommunityByName,
  getAllCommunitiesOfUser,
  topCommunities,
  communityFollow,
  communityUnfollow,
  communityUpdateInfo,
  inviteUserForMod,
  deleteInvitedRequestToUser,
  uploadCommunityProfilePictureTempImage,
  deleteCommunityImage,
  leaveMod,
} from "./CommunityAction";

const initialState = {
  communityPopup: false,
  communityButtonLoader: false,
  communityScreenLoader: false,
  communityCreated: false,
  currentCommunity: {},
  communityInfoUpdate: false,
  topFiveCommunities: [],
  communityFollowed: false,
  communityTempImageUpload: false,
  communityTempImageInfo: {},
  communityUnfollowed: false,
  bioTextarea: false,
  userFollowCommunities:
    localStorage.getItem("userFollowCommunities") === null
      ? []
      : JSON.parse(localStorage.getItem("userFollowCommunities")),
  userModCommunities:
    localStorage.getItem("userModCommunities") === null
      ? []
      : JSON.parse(localStorage.getItem("userModCommunities")),
  userCreatedCommunities:
    localStorage.getItem("userCreatedCommunities") === null
      ? []
      : JSON.parse(localStorage.getItem("userCreatedCommunities")),
  modInvited: false,
  leftAsMod: false,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    updateLeftAsModValue: (state, action) => {
      state.leftAsMod = false;
    },
    updateCommunityInfoUpdate: (state, action) => {
      state.communityInfoUpdate = false;
    },
    updateCommunityPopupValue: (state, action) => {
      state.communityPopup = !state.communityPopup;
    },
    updateCommunityButtonLoaderValue: (state, action) => {
      state.communityButtonLoader = true;
    },
    updateCommunityScreenLoaderValue: (state, action) => {
      state.communityScreenLoader = true;
    },
    updateCommunityCreatedValue: (state, action) => {
      state.communityCreated = false;
    },
    updateCommunityFollowedValue: (state, action) => {
      state.communityFollowed = false;
    },
    updateBioTextAreaValue: (state, action) => {
      state.bioTextarea = !state.bioTextarea;
    },
    updateBioTextAreaValueToFalse: (state, action) => {
      state.bioTextarea = false;
    },
    updateCommunityUnfollowedValue: (state, action) => {
      state.communityUnfollowed = false;
    },
    updateCommunityPostsArray: (state, action) => {
      if (Object.keys(current(state.currentCommunity)).length !== 0) {
        const findPostIndex = current(state.currentCommunity).posts.findIndex(
          (post) => {
            return (
              post.postId._id.toString() ===
              action.payload.data.data._id.toString()
            );
          }
        );
        if (findPostIndex !== -1)
          state.currentCommunity.posts[findPostIndex].postId =
            action.payload.data.data;
      }
    },
    updateTopCommunitiesPostsArray: (state, action) => {
      const findPostIndex = current(state.topFiveCommunities).findIndex(
        (community) => {
          return (
            community._id.toString() ===
            localStorage.getItem("communityId").toString()
          );
        }
      );
      if (findPostIndex !== -1) {
        if (action.payload.status === "join") {
          state.topFiveCommunities[findPostIndex].members.push({
            id: action.payload.loggedInUserId,
          });
        } else if (action.payload.status === "joined") {
          const membersArray = state.topFiveCommunities[
            findPostIndex
          ].members.filter((member) => {
            return (
              member.id.toString() !== action.payload.loggedInUserId.toString()
            );
          });
          state.topFiveCommunities[findPostIndex].members = membersArray;
        }
      }
    },
    updateCurrentCommunityPostsArray: (state, action) => {
      if (Object.keys(state.currentCommunity).length !== 0) {
        state.currentCommunity.posts = state.currentCommunity.posts.filter(
          (post) => {
            return post.postId._id.toString() !== action.payload.data.data._id;
          }
        );
      }
    },
    updateModInvitedValue: (state, action) => {
      state.modInvited = false;
    },
  },
  extraReducers: {
    [createCommunity.pending]: (state, action) => {
      console.log("pending");
    },
    [createCommunity.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.communityCreated = true;
        state.currentCommunity = action.payload.data.data;
      } else if (action.payload.status === 401) {
        state.communityPopup = false;
      }
      state.communityButtonLoader = false;
    },
    [createCommunity.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityButtonLoader = false;
    },
    [getCommunityByName.pending]: (state, action) => {
      console.log("pending");
      state.communityScreenLoader = true;
    },
    [getCommunityByName.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.currentCommunity = action.payload.data.data;
      }
      state.communityScreenLoader = false;
    },
    [getCommunityByName.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityScreenLoader = false;
    },
    [getAllCommunitiesOfUser.pending]: (state, action) => {
      console.log("pending");
      state.communityScreenLoader = true;
    },
    [getAllCommunitiesOfUser.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.userFollowCommunities =
          action.payload.data.data.memberCommunities;
        state.userModCommunities = action.payload.data.data.modCommunities;
        state.userCreatedCommunities =
          action.payload.data.data.createdCommunities;
        localStorage.setItem(
          "userFollowCommunities",
          JSON.stringify(action.payload.data.data.memberCommunities)
        );
        localStorage.setItem(
          "userModCommunities",
          JSON.stringify(action.payload.data.data.modCommunities)
        );
        localStorage.setItem(
          "userCreatedCommunities",
          JSON.stringify(action.payload.data.data.createdCommunities)
        );
      }
      state.communityScreenLoader = false;
    },
    [getAllCommunitiesOfUser.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityScreenLoader = false;
    },
    [communityFollow.pending]: (state, action) => {
      console.log("pending");
      state.communityButtonLoader = true;
      state.communityFollowed = false;
    },
    [communityFollow.fulfilled]: (state, action) => {
      if (action.payload.status === 204) {
        state.communityFollowed = true;
      }
      state.communityButtonLoader = false;
    },
    [communityFollow.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityButtonLoader = false;
    },
    [communityUnfollow.pending]: (state, action) => {
      console.log("pending");
      state.communityButtonLoader = true;
      state.communityUnfollowed = false;
    },
    [communityUnfollow.fulfilled]: (state, action) => {
      if (action.payload.status === 204) {
        state.communityUnfollowed = true;
      }
      state.communityButtonLoader = false;
    },
    [communityUnfollow.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityButtonLoader = false;
    },
    [topCommunities.pending]: (state, action) => {
      console.log("pending");
      state.communityScreenLoader = true;
    },
    [topCommunities.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.topFiveCommunities = action.payload.data.data;
      }
      state.communityScreenLoader = false;
    },
    [topCommunities.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityScreenLoader = false;
    },
    [communityUpdateInfo.pending]: (state, action) => {
      console.log("pending");
      state.communityButtonLoader = true;
    },
    [communityUpdateInfo.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.bioTextarea = false;
        state.currentCommunity = action.payload.data.data;
        state.communityTempImageInfo = {};
        state.communityTempImageUpload = false;
        state.communityInfoUpdate = true;
      }
      state.communityButtonLoader = false;
    },
    [communityUpdateInfo.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityButtonLoader = false;
    },
    [inviteUserForMod.pending]: (state, action) => {
      console.log("pending");
      state.communityButtonLoader = true;
    },
    [inviteUserForMod.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.currentCommunity.invitedUsersForMod.push(
          action.payload.data.data
        );
        state.modInvited = true;
      }
      state.communityButtonLoader = false;
    },
    [inviteUserForMod.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityButtonLoader = false;
    },
    [deleteInvitedRequestToUser.pending]: (state, action) => {
      console.log("pending");
      state.communityButtonLoader = true;
    },
    [deleteInvitedRequestToUser.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.currentCommunity.invitedUsersForMod =
          state.currentCommunity.invitedUsersForMod.filter((mod) => {
            return (
              mod._id.toString() !==
              action.payload.data.data.inviteId.toString()
            );
          });
      }
      state.communityButtonLoader = false;
    },
    [deleteInvitedRequestToUser.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityButtonLoader = false;
    },
    [uploadCommunityProfilePictureTempImage.pending]: (state, action) => {
      console.log("pending");
      state.communityButtonLoader = true;
    },
    [uploadCommunityProfilePictureTempImage.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.communityTempImageUpload = true;
        state.communityTempImageInfo = action.payload.data.data;
      }
      state.communityButtonLoader = false;
    },
    [uploadCommunityProfilePictureTempImage.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityButtonLoader = false;
    },
    [deleteCommunityImage.pending]: (state, action) => {
      console.log("pending");
      state.communityButtonLoader = true;
    },
    [deleteCommunityImage.fulfilled]: (state, action) => {
      if (action.payload.status === 204) {
        state.communityTempImageUpload = false;
        state.communityTempImageInfo = {};
      }
      state.communityButtonLoader = false;
    },
    [deleteCommunityImage.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityButtonLoader = false;
    },
    [leaveMod.pending]: (state, action) => {
      console.log("pending");
      state.communityButtonLoader = true;
    },
    [leaveMod.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.leftAsMod = true;
        state.currentCommunity.moderators =
          state.currentCommunity.moderators.filter((mod) => {
            return (
              mod.id._id.toString() !== action.payload.data.data.toString()
            );
          });
      }
      state.communityButtonLoader = false;
    },
    [leaveMod.rejected]: (state, action) => {
      toast.error("Please check your internet connection");
      state.communityButtonLoader = false;
    },
  },
});

export const communityActions = communitySlice.actions;
export default communitySlice;
