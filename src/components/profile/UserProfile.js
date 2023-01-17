import { CircularProgress, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCommunitiesOfUser } from "../../store/CommunityAction";
import { postActions } from "../../store/PostSlice";
import {
  deleteUserImage,
  getUserByName,
  loggedInUserInformation,
  uploadProfilePictureTempImage,
  userFollow,
  userUnfollow,
  userUpdateInfo,
} from "../../store/UserAction";
import { userActions } from "../../store/UserSlice";
import Layout from "../layout/Layout";
import "./userProfile.css";
import UserProfileRightInformation from "./UserProfileRightInformation";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName, type } = useParams();
  const {
    communityScreenLoader,
    userFollowCommunities,
    userCreatedCommunities,
    userModCommunities,
  } = useSelector((state) => state.community);
  const {
    loggedInUserInfo,
    userAuth,
    userLoggedIn,
    userScreenLoader,
    currentUser,
    userButtonLoader,
    userFollowed,
    userUnfollowed,
    userTempImageUpload,
    userTempImageInfo,
    userInfoUpdate,
  } = useSelector((state) => state.user);
  const { postDeleted } = useSelector((state) => state.post);
  const [openProfilePictureDialog, setOpenProfilePictureDialog] =
    useState(false);
  const [filename, setFilename] = useState("");

  useEffect(() => {
    if (postDeleted) {
      toast.success("Post deleted", {
        toastId: 1,
      });
    }
    dispatch(postActions.updatePostDeletedVaue());
  }, [postDeleted, dispatch]);

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(getAllCommunitiesOfUser());
      dispatch(userActions.updateUserScreenLoaderValue());
      dispatch(loggedInUserInformation());
    }
    dispatch(userActions.updateUserFollowValue());
    dispatch(userActions.updateUserUnfollowValue());
  }, [userLoggedIn, dispatch, userFollowed, userUnfollowed]);

  useEffect(() => {
    dispatch(userActions.updateUserScreenLoaderValue());
    dispatch(getUserByName(userName));
    dispatch(
      userActions.updateDropdownTitleValue({
        name: currentUser?.username,
        image: currentUser?.picture,
        type: "image",
      })
    );
  }, [dispatch, userName, currentUser.username, currentUser.picture]);

  useEffect(() => {
    if (userAuth) {
      navigate("/login");
    }
  }, [userAuth, navigate]);

  const handleClickOpenProfilePictureDialog = () => {
    setOpenProfilePictureDialog(true);
  };

  const handleCloseProfilePictureDialog = () => {
    setOpenProfilePictureDialog(false);
  };

  const headerItemClicked = (type) => {
    navigate(`/user/${userName}/${type}`);
  };

  const actionHandlerHome = (action) => {
    if (action === "input-clicked") {
      navigate(`/user/${currentUser?.username}/submit`);
    } else if (action === "upload-profile-picture") {
      dispatch(userUpdateInfo({ picture: userTempImageInfo?.filename }));
    } else if (action === "create-post") {
      navigate(`/user/${currentUser?.username}/submit`);
    }
  };

  useEffect(() => {
    if (userInfoUpdate) {
      setOpenProfilePictureDialog(false);
      setFilename("");
      dispatch(userActions.updateUserInfoUpdate());
    }
  }, [dispatch, userInfoUpdate]);

  const userFollowStatus =
    userLoggedIn &&
    loggedInUserInfo?.usersFollow?.find((user) => {
      return user?.id === currentUser?._id;
    });

  const followActionHandler = (status) => {
    if (status === "follow") {
      dispatch(userFollow({ userFollowedId: currentUser?._id }));
    } else if (status === "unfollow") {
      dispatch(userUnfollow({ userUnfollowedId: currentUser?._id }));
    }
  };

  const uploadImageHandler = (e) => {
    setFilename(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    dispatch(uploadProfilePictureTempImage(formData));
  };

  const userRemoveImageHandler = () => {
    dispatch(
      deleteUserImage({
        filename: userTempImageInfo?.filename,
        fileId: userTempImageInfo?.id,
      })
    );
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div className="userprofile-wrapper">
        {communityScreenLoader || (userLoggedIn && userScreenLoader) ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="header">
              {type === "overview" ? (
                <p id="selected">OVERVIEW</p>
              ) : (
                <Tooltip title="this has not implemented yet">
                  <p style={{ cursor: "default" }}>OVERVIEW</p>
                </Tooltip>
              )}
              {type === "posts" ? (
                <p id="selected">POSTS</p>
              ) : (
                <p onClick={() => headerItemClicked("posts")}>POSTS</p>
              )}
              {type === "comments" ? (
                <p id="selected">COMMENTS</p>
              ) : (
                <Tooltip title="this has not implemented yet">
                  <p style={{ cursor: "default" }}>COMMENTS</p>
                </Tooltip>
              )}
              {type === "saved" ? (
                <p id="selected">SAVED</p>
              ) : (
                <Tooltip title="this has not implemented yet">
                  <p style={{ cursor: "default" }}>SAVED</p>
                </Tooltip>
              )}
            </div>
            <div className="user-info-mobile">
              <UserProfileRightInformation
                data={{
                  currentUser,
                  type,
                  loggedInUserInfo,
                  actionHandlerHome,
                  followActionHandler,
                  userFollowStatus,
                  userButtonLoader,
                  userLoggedIn,
                  openProfilePictureDialog,
                  handleClickOpenProfilePictureDialog,
                  handleCloseProfilePictureDialog,
                  uploadImageHandler,
                  filename,
                  userTempImageUpload,
                  userTempImageInfo,
                  userRemoveImageHandler,
                  userFollowCommunities,
                  userCreatedCommunities,
                  userModCommunities,
                }}
              />
            </div>
            <Layout
              query={"show-user"}
              data={{
                currentUser,
                type,
                loggedInUserInfo,
                actionHandlerHome,
                followActionHandler,
                userFollowStatus,
                userButtonLoader,
                userLoggedIn,
                openProfilePictureDialog,
                handleClickOpenProfilePictureDialog,
                handleCloseProfilePictureDialog,
                uploadImageHandler,
                filename,
                userTempImageUpload,
                userTempImageInfo,
                userRemoveImageHandler,
                userFollowCommunities,
                userCreatedCommunities,
                userModCommunities,
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default UserProfile;
