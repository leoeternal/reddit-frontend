import React from "react";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CakeIcon from "@mui/icons-material/Cake";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import moment from "moment";
import "./userProfileRightInformation.css";
import ProfilePictureUploadDiaglog from "./ProfilePictureUploadDiaglog";

function UserProfileRightInformation({ data }) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  const {
    currentUser,
    loggedInUserInfo,
    followActionHandler,
    actionHandlerHome,
    userFollowStatus,
    userButtonLoader,
    userLoggedIn,
    createPostStatus,
    openProfilePictureDialog,
    handleClickOpenProfilePictureDialog,
    handleCloseProfilePictureDialog,
    uploadImageHandler,
    filename,
    userTempImageUpload,
    userTempImageInfo,
    userRemoveImageHandler,
  } = data;

  return (
    <div className="userrightinfo-wrapper">
      <div className="cover-background">
        <div className="user-picture-container">
          <div className="picture">
            <ProfilePictureUploadDiaglog
              openProfilePictureDialog={openProfilePictureDialog}
              handleCloseProfilePictureDialog={handleCloseProfilePictureDialog}
              userButtonLoader={userButtonLoader}
              uploadImageHandler={uploadImageHandler}
              filename={filename}
              userTempImageUpload={userTempImageUpload}
              userTempImageInfo={userTempImageInfo}
              userRemoveImageHandler={userRemoveImageHandler}
              actionHandlerHome={actionHandlerHome}
            />
            {createPostStatus ? (
              <Avatar
                alt={loggedInUserInfo?.username?.toUpperCase()}
                variant="square"
                sx={{ width: "80px", height: "80px" }}
                src={`${imageURL}/render/image/${loggedInUserInfo?.picture}`}
              />
            ) : (
              <>
                <Avatar
                  alt={currentUser?.username?.toUpperCase()}
                  variant="square"
                  sx={{ width: "80px", height: "80px", cursor: "pointer" }}
                  src={`${imageURL}/render/image/${currentUser?.picture}`}
                  onClick={
                    currentUser?._id === loggedInUserInfo?._id
                      ? handleClickOpenProfilePictureDialog
                      : null
                  }
                />
              </>
            )}
          </div>
          <div className="name">
            {createPostStatus ? (
              <p id="name">u/{loggedInUserInfo?.username}</p>
            ) : (
              <p id="name">u/{currentUser?.username}</p>
            )}
          </div>
          {/* {!createPostStatus ? (
            <SettingsOutlinedIcon
              sx={{
                position: "absolute",
                right: "5px",
                bottom: "5px",
                color: "rgb(3,122,211)",
                cursor: "pointer",
              }}
            />
          ) : null} */}
        </div>
      </div>

      <div className="karma-cake-container">
        <div className="karma-cake-box">
          <p id="title">Karma</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AcUnitIcon sx={{ fontSize: "15px", color: "rgb(36,160,267)" }} />
            <p id="sub-title">
              {createPostStatus ? loggedInUserInfo?.karma : currentUser?.karma}
            </p>
          </div>
        </div>
        <div className="karma-cake-box">
          <p id="title">Cake day</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CakeIcon sx={{ fontSize: "15px", color: "rgb(36,160,267)" }} />
            {createPostStatus ? (
              <p id="sub-title">
                {moment(loggedInUserInfo?.createdAt).format("MMM DD,YYYY")}
              </p>
            ) : (
              <p id="sub-title">
                {moment(currentUser?.createdAt).format("MMM DD,YYYY")}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="follower-box-container">
        <div className="follower-box">
          <p id="title">Followers</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ fontSize: "15px", color: "rgb(36,160,267)" }} />
            <p id="sub-title">
              {createPostStatus
                ? loggedInUserInfo?.usersFollowers?.length
                : currentUser?.usersFollowers?.length}
            </p>
          </div>
        </div>
      </div>
      {!createPostStatus ? (
        <>
          {userLoggedIn ? (
            <>
              {loggedInUserInfo?._id === currentUser?._id ? (
                <>
                  <div style={{ padding: "10px 10px 0 10px" }}>
                    {/* <Button size="small" fullWidth variant="outlined">
                      Add social link
                    </Button> */}
                  </div>
                  <div style={{ padding: "10px" }}>
                    <Button
                      onClick={() => actionHandlerHome("create-post")}
                      size="small"
                      fullWidth
                      variant="contained"
                    >
                      New Post
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* <div style={{ padding: "10px 10px 0 10px" }}>
                    <Button size="small" fullWidth variant="outlined">
                      Chat
                    </Button>
                  </div> */}
                  {userFollowStatus !== false &&
                  userFollowStatus !== undefined ? (
                    <div style={{ padding: "10px" }}>
                      {userButtonLoader ? (
                        <Button
                          disabled
                          size="small"
                          fullWidth
                          variant="contained"
                        >
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          onClick={() => followActionHandler("unfollow")}
                          size="small"
                          fullWidth
                          variant="contained"
                        >
                          Unfollow
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div style={{ padding: "10px" }}>
                      {userButtonLoader ? (
                        <Button
                          disabled
                          size="small"
                          fullWidth
                          variant="contained"
                        >
                          Follow
                        </Button>
                      ) : (
                        <Button
                          onClick={() => followActionHandler("follow")}
                          size="small"
                          fullWidth
                          variant="contained"
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default UserProfileRightInformation;
