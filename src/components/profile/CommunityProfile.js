import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  communityFollow,
  communityUnfollow,
  communityUpdateInfo,
  deleteCommunityImage,
  getAllCommunitiesOfUser,
  getCommunityByName,
  uploadCommunityProfilePictureTempImage,
} from "../../store/CommunityAction";
import { communityActions } from "../../store/CommunitySlice";
import Layout from "../layout/Layout";
import "./communityProfile.css";
import { userActions } from "../../store/UserSlice";
import { loggedInUserInformation } from "../../store/UserAction";
import { Avatar } from "@mui/material";
import { postActions } from "../../store/PostSlice";
import ProfilePictureUploadDiaglog from "./ProfilePictureUploadDiaglog";
import CommunityRightInfoComponent from "./CommunityRightInfoComponent";

function CommunityProfile() {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { communityName } = useParams();
  const {
    communityScreenLoader,
    currentCommunity,
    communityButtonLoader,
    communityFollowed,
    communityUnfollowed,
    communityTempImageUpload,
    communityTempImageInfo,
    communityInfoUpdate,
  } = useSelector((state) => state.community);
  const { loggedInUserInfo, userAuth, userLoggedIn, userScreenLoader } =
    useSelector((state) => state.user);
  const { postDeleted } = useSelector((state) => state.post);
  const [openProfilePictureDialog, setOpenProfilePictureDialog] =
    useState(false);
  const [filename, setFilename] = useState("");

  useEffect(() => {
    if (communityInfoUpdate) {
      setOpenProfilePictureDialog(false);
      setFilename("");
      dispatch(communityActions.updateCommunityInfoUpdate());
    }
  }, [dispatch, communityInfoUpdate]);

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
    dispatch(communityActions.updateCommunityFollowedValue());
    dispatch(communityActions.updateCommunityUnfollowedValue());
    dispatch(communityActions.updateBioTextAreaValueToFalse());
  }, [userLoggedIn, dispatch, communityFollowed, communityUnfollowed]);

  useEffect(() => {
    dispatch(communityActions.updateCommunityScreenLoaderValue());
    dispatch(getCommunityByName(communityName));
    dispatch(
      userActions.updateDropdownTitleValue({
        name: currentCommunity?.communityName,
        image: currentCommunity?.communityPicture,
        type: "image",
      })
    );
  }, [
    dispatch,
    communityName,
    currentCommunity.communityPicture,
    currentCommunity.communityName,
  ]);

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

  const uploadImageHandler = (e) => {
    setFilename(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    dispatch(uploadCommunityProfilePictureTempImage(formData));
  };

  const userRemoveImageHandler = () => {
    dispatch(
      deleteCommunityImage({
        filename: communityTempImageInfo?.filename,
        fileId: communityTempImageInfo?.id,
      })
    );
  };

  const communityFollowStatus =
    userLoggedIn &&
    loggedInUserInfo?.communitiesFollow?.find((community) => {
      return community?.id?.toString() === currentCommunity?._id?.toString();
    });

  const actionHandlerHome = (action, data) => {
    if (action === "input-clicked") {
      navigate(`/r/${currentCommunity?.communityName}/submit`);
    } else if (action === "galleryicon-clicked") {
      navigate(`/r/${currentCommunity?.communityName}/submit?media=true`);
    } else if (action === "bio-update") {
      const sendData = {
        communityId: currentCommunity?._id,
        updateData: {
          description: data?.bio,
        },
      };
      dispatch(communityUpdateInfo(sendData));
    } else if (action === "view-moderator") {
      navigate(`/r/${data?.currentCommunity?.communityName}/about/moderators`);
    } else if (action === "username-clicked") {
      navigate(`/user/${data?.username}/posts`);
    } else if (action === "upload-profile-picture") {
      const sendData = {
        communityId: currentCommunity?._id,
        updateData: {
          communityPicture: communityTempImageInfo?.filename,
        },
      };
      dispatch(communityUpdateInfo(sendData));
    } else if (action === "create-post") {
      navigate(`/r/${currentCommunity?.communityName}/submit`);
    } else if (action === "login") {
      navigate("/login");
    } else if (action === "register") {
      navigate("/register");
    }
  };

  const followActionHandler = (status) => {
    if (status === "follow") {
      dispatch(communityFollow({ communityId: currentCommunity?._id }));
    } else if (status === "unfollow") {
      dispatch(communityUnfollow({ communityId: currentCommunity?._id }));
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div className="communityprofile-wrapper">
        {communityScreenLoader || (userLoggedIn && userScreenLoader) ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="coverpicture-container"></div>
            <div className="profilepicture-wrapper">
              <div className="profilepicture-container">
                <div className="picture">
                  <ProfilePictureUploadDiaglog
                    openProfilePictureDialog={openProfilePictureDialog}
                    handleCloseProfilePictureDialog={
                      handleCloseProfilePictureDialog
                    }
                    userButtonLoader={communityButtonLoader}
                    uploadImageHandler={uploadImageHandler}
                    filename={filename}
                    userTempImageUpload={communityTempImageUpload}
                    userTempImageInfo={communityTempImageInfo}
                    userRemoveImageHandler={userRemoveImageHandler}
                    actionHandlerHome={actionHandlerHome}
                  />
                  {userLoggedIn &&
                  (currentCommunity?.createdBy?.id?._id?.toString() ===
                    loggedInUserInfo?._id?.toString() ||
                    currentCommunity?.moderators?.some(
                      (mod) =>
                        mod?.id?._id?.toString() ===
                          loggedInUserInfo?._id?.toString() &&
                        mod?.permissions?.includes("picture")
                    )) ? (
                    <Avatar
                      alt={currentCommunity?.communityName?.toUpperCase()}
                      variant="circle"
                      sx={{
                        width: "100%",
                        height: "100%",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                      src={`${imageURL}/render/image/${currentCommunity?.communityPicture}`}
                      onClick={handleClickOpenProfilePictureDialog}
                    />
                  ) : (
                    <Avatar
                      alt={currentCommunity?.communityName?.toUpperCase()}
                      variant="circle"
                      sx={{
                        width: "100%",
                        height: "100%",
                        marginRight: "5px",
                      }}
                      src={`${imageURL}/render/image/${currentCommunity?.communityPicture}`}
                    />
                  )}
                </div>
                <div className="name-container">
                  <p id="communityname">{currentCommunity?.communityName}</p>
                  <p id="sub-communityname">
                    r/{currentCommunity?.communityName}
                  </p>
                  {userLoggedIn ? (
                    <div className="buttons-mobile">
                      {communityFollowStatus !== false &&
                      communityFollowStatus !== undefined ? (
                        <>
                          {communityButtonLoader ? (
                            <Button
                              sx={{ marginTop: "5px" }}
                              size="small"
                              variant="outlined"
                              disabled
                            >
                              Joined
                            </Button>
                          ) : (
                            <Button
                              sx={{ marginTop: "5px" }}
                              size="small"
                              variant="outlined"
                              onClick={() => followActionHandler("unfollow")}
                            >
                              Joined
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          {communityButtonLoader ? (
                            <Button
                              sx={{ marginTop: "5px" }}
                              size="small"
                              variant="outlined"
                              disabled
                            >
                              Join
                            </Button>
                          ) : (
                            <Button
                              onClick={() => followActionHandler("follow")}
                              sx={{ marginTop: "5px" }}
                              size="small"
                              variant="outlined"
                            >
                              Join
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
                {userLoggedIn ? (
                  <div className="buttons">
                    {communityFollowStatus !== false &&
                    communityFollowStatus !== undefined ? (
                      <>
                        {communityButtonLoader ? (
                          <Button
                            sx={{ margin: "10px 0px 0px 5px" }}
                            variant="outlined"
                            disabled
                          >
                            Joined
                          </Button>
                        ) : (
                          <Button
                            sx={{ margin: "10px 0px 0px 5px" }}
                            variant="outlined"
                            onClick={() => followActionHandler("unfollow")}
                          >
                            Joined
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        {communityButtonLoader ? (
                          <Button
                            sx={{ margin: "10px 0px 0px 5px" }}
                            variant="outlined"
                            disabled
                          >
                            Join
                          </Button>
                        ) : (
                          <Button
                            onClick={() => followActionHandler("follow")}
                            sx={{ margin: "10px 0px 0px 5px" }}
                            variant="outlined"
                          >
                            Join
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="community-info-mobile">
              <CommunityRightInfoComponent
                data={{
                  currentCommunity,
                  actionHandlerHome,
                  userLoggedIn,
                  loggedInUserInfo,
                  createPostStatus: false,
                }}
              />
            </div>
            <Layout
              query={"show-community"}
              data={{
                currentCommunity,
                actionHandlerHome,
                userLoggedIn,
                loggedInUserInfo,
                createPostStatus: false,
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default CommunityProfile;
