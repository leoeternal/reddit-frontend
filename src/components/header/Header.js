import React, { useEffect, useState } from "react";
import redditLogo from "../../assets/images/reddit-logo.png";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";
import "./header.css";
import DropDown from "../helperComponent/DropDown";
import ProfileDropDown from "./ProfileDropDown";
import CommunityDialogBox from "../community/CommunityDialogBox";
import { useDispatch, useSelector } from "react-redux";
import {
  answerInviteRequest,
  logoutUser,
  searchUsersAndCommunities,
} from "../../store/UserAction";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import axios from "../../helper/axiosInstance";
import { userActions } from "../../store/UserSlice";
import Search from "./Search";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userLoggedIn,
    userAuth,
    loggedInUserInfo,
    notifications,
    searchLoader,
    searchCommunities,
    searchUsers,
    notificationButtonLoader,
  } = useSelector((state) => state.user);
  const {
    communityPopup,
    userFollowCommunities,
    userCreatedCommunities,
    userModCommunities,
  } = useSelector((state) => state.community);

  const [notificationPopup, setNotificationPopup] = useState(false);
  const [notificationLoader, setNotificationLoader] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchPopup, setSearchPopup] = useState(false);

  useEffect(() => {
    if (userAuth) {
      navigate("/login");
    }
  }, [userAuth, navigate]);

  const actionHandler = (action) => {
    if (action === "home") {
      navigate("/");
    } else if (action === "logout") {
      dispatch(logoutUser());
    } else if (action === "login") {
      navigate("/login");
    } else if (action === "register") {
      navigate("/register");
    } else if (action === "profile-clicked") {
      navigate(`/user/${loggedInUserInfo.username}/posts`);
    } else if (action === "create-post") {
      navigate("/submit");
    }
  };

  const communityClicked = (name, query) => {
    if (query === "header") {
      navigate(`/r/${name}`);
    }
  };

  const updateNewNotifications = async () => {
    setNotificationLoader(true);
    const updateData = () => {
      const response = axios.patch(
        `/user/info/update`,
        { newNotification: 0 },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      return response;
    };

    const data = await updateData();
    if (data.status === 200) {
      dispatch(userActions.updateLoggedInUserValue(data.data.data));
    }
    setNotificationLoader(false);
  };

  const notificationNavigateHandler = (
    type,
    post,
    community,
    userTo,
    userBy
  ) => {
    if (type === "followUser") {
      navigate(`/user/${userBy.username}/posts`);
    } else if (
      type === "inviteUserForCommunity" ||
      type === "communityAcceptOrDeclineRequest"
    ) {
      navigate(`/r/${community.communityName}`);
    } else {
      navigate(
        `/${post.postedForType === "community" ? "r" : "user"}/${
          post.postedForType === "community"
            ? post.postedForCommunity.id.communityName
            : post.postedForUser.id.username
        }/comments/${post._id}/${post.title}`
      );
    }
    setNotificationPopup(false);
  };

  const notificationButtonHandler = (
    type,
    notificationId = "",
    status = "",
    event
  ) => {
    event.stopPropagation();
    if (type === "invite-request-button-clicked") {
      dispatch(answerInviteRequest({ notificationId, status }));
    }
  };

  const searchNavigateHandler = (name, type) => {
    if (type === "community") {
      navigate(`/r/${name}`);
    } else {
      navigate(`/user/${name}/posts`);
    }
    setSearchPopup(false);
  };

  const searchHandler = (query) => {
    if (query === "") {
      setSearchPopup(false);
    } else {
      setSearchPopup(true);
    }
    setSearchText(query);
    dispatch(searchUsersAndCommunities(query));
  };

  return (
    <>
      {communityPopup ? <CommunityDialogBox /> : null}
      <div className="header-wrapper">
        <div onClick={() => actionHandler("home")} className="company-info">
          <img
            alt="website-logo"
            style={{ width: "40px", height: "40px" }}
            src={redditLogo}
          />

          <p id="heading-1">reddit</p>
        </div>
        {userLoggedIn ? (
          <div className="dropdown">
            <DropDown
              query={"header"}
              data={{
                userFollowCommunities,
                userCreatedCommunities,
                userModCommunities,
                communityClicked,
              }}
            />
          </div>
        ) : null}

        <div
          style={!userLoggedIn ? { margin: "0 0 0 20px" } : null}
          className="search"
        >
          <input
            onChange={(e) => searchHandler(e.target.value)}
            type="text"
            value={searchText}
            placeholder="Search Reddit"
          />
          {searchPopup ? (
            <div className="search-dropdown">
              <Search
                searchLoader={searchLoader}
                type={"search-dropdown"}
                searchCommunities={searchCommunities}
                searchUsers={searchUsers}
                searchNavigateHandler={searchNavigateHandler}
              />
            </div>
          ) : null}
        </div>
        <div className="action-buttons">
          {userLoggedIn ? (
            <>
              {notificationPopup ? (
                <Notification
                  notificationLoader={notificationLoader}
                  notifications={notifications}
                  notificationNavigateHandler={notificationNavigateHandler}
                  notificationButtonHandler={notificationButtonHandler}
                  notificationButtonLoader={notificationButtonLoader}
                />
              ) : null}

              {/* <Tooltip title="All">
                <InsertChartOutlinedTwoToneIcon sx={{ cursor: "pointer" }} />
              </Tooltip> */}
              <Tooltip title="Chat (this feature hasn't implmeneted yet)">
                <ChatOutlinedIcon id="chat-icon" />
              </Tooltip>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Tooltip title="Notifications">
                  <NotificationsNoneOutlinedIcon
                    id="notification-icon"
                    onClick={() => {
                      setNotificationPopup(!notificationPopup);
                      !notificationPopup &&
                        loggedInUserInfo?.newNotification !== 0 &&
                        updateNewNotifications();
                    }}
                    sx={{ cursor: "pointer" }}
                  />
                </Tooltip>
                {loggedInUserInfo?.newNotification === 0 ? null : (
                  <p
                    style={{
                      border: "1px solid",
                      borderRadius: "50%",
                      padding: "2px 5px",
                      backgroundColor: "red",
                      color: "white",
                      position: "absolute",
                      top: "-10px",
                      left: "15px",
                      fontSize: "11px",
                    }}
                  >
                    {loggedInUserInfo?.newNotification}
                  </p>
                )}
              </div>
              <Tooltip title="Create Post">
                <AddOutlinedIcon
                  id="addpost-icon"
                  onClick={() => actionHandler("create-post")}
                  sx={{ cursor: "pointer" }}
                />
              </Tooltip>
            </>
          ) : (
            <div className="auth-buttons">
              <Button
                onClick={() => actionHandler("register")}
                variant="outlined"
                id="header-auth"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => actionHandler("login")}
                variant="contained"
                id="header-auth"
                sx={{ marginLeft: "10px" }}
              >
                Log In
              </Button>
            </div>
          )}
        </div>
        {userLoggedIn ? (
          <div className="profile-dropdown">
            <ProfileDropDown
              userLoggedIn={userLoggedIn}
              actionHandler={actionHandler}
              loggedInUserInfo={loggedInUserInfo}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Header;
