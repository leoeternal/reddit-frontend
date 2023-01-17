import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import GraphicEqIcon from "@mui/icons-material/GraphicEq";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import "./dropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { communityActions } from "../../store/CommunitySlice";
import { Avatar } from "@mui/material";
// import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import { useNavigate } from "react-router-dom";

function DropDown({ data = {}, query = "" }) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  const navigate = useNavigate();
  const {
    userFollowCommunities,
    userCreatedCommunities,
    userModCommunities,
    communityClicked,
  } = data;
  const dispatch = useDispatch();
  const { loggedInUserInfo, dropdownTitle, createPostDropdownTitle } =
    useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);

  const navigateHandler = (selection) => {
    setDropdown(false);
    if (selection === "home") {
      navigate("/");
    } else if (selection === "create-post") {
      navigate("/submit");
    } else if (selection === "profile") {
      navigate(`/user/${loggedInUserInfo?.username}/posts`);
    }
  };
  return (
    <>
      {query === "header" ? (
        <div
          onClick={() => setDropdown(!dropdown)}
          style={dropdown ? { border: "1px solid rgb(217, 217, 217)" } : null}
          className="selected-option"
        >
          {dropdownTitle?.type === "icon" ? (
            dropdownTitle?.image
          ) : (
            <Avatar
              sx={{ width: "25px", height: "25px" }}
              alt={dropdownTitle?.name?.toUpperCase()}
              src={`${imageURL}/render/image/${dropdownTitle?.image}`}
            />
          )}
          <p id="selected-name-header">{dropdownTitle?.name}</p>
          <KeyboardArrowDownIcon id="downarrow-icon" />
        </div>
      ) : (
        <div
          onClick={() => setDropdown(!dropdown)}
          style={dropdown ? { border: "1px solid rgb(217, 217, 217)" } : null}
          className="selected-option"
        >
          {Object.keys(createPostDropdownTitle).length === 0 ? (
            <>
              <HomeIcon />
              <p id="selected-name">Choose a community</p>
            </>
          ) : (
            <div>
              <Avatar
                alt={createPostDropdownTitle?.name?.toUpperCase()}
                variant="circle"
                sx={{ width: "25px", height: "25px" }}
                src={`${imageURL}/render/image/${createPostDropdownTitle?.image}`}
              />
              {createPostDropdownTitle?.type === "community" ? (
                <p id="selected-name">r/{createPostDropdownTitle?.name}</p>
              ) : (
                <p id="selected-name">u/{createPostDropdownTitle?.name}</p>
              )}
            </div>
          )}

          <KeyboardArrowDownIcon id="downarrow-icon" />
        </div>
      )}

      {dropdown ? (
        <div className="options">
          {query === "create-post" ? (
            <>
              <p id="your-community">YOUR PROFILE</p>
              <div
                onClick={() => {
                  communityClicked(loggedInUserInfo?.username, "user");
                  setDropdown(!dropdown);
                }}
                className="community-list"
              >
                <Avatar
                  alt={loggedInUserInfo?.username?.toUpperCase()}
                  variant="circle"
                  sx={{ marginRight: "5px" }}
                  src={`${imageURL}/render/image/${loggedInUserInfo?.picture}`}
                />
                <p id="create-community">u/{loggedInUserInfo?.username}</p>
                {/* {query === "header" ? <StarBorderIcon id="star" /> : null} */}
              </div>
              <hr />
            </>
          ) : null}

          <div
            onClick={() => {
              dispatch(communityActions.updateCommunityPopupValue());
              setDropdown(!dropdown);
            }}
            className="create-community-container"
          >
            <AddOutlinedIcon />
            <p id="create-community">Create Community</p>
          </div>
          {userFollowCommunities?.length > 0 ? (
            <>
              <p id="your-community">Following</p>
              {userFollowCommunities &&
                userFollowCommunities?.map((community, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        communityClicked(community?.communityName, query);
                        setDropdown(false);
                      }}
                      className="community-list"
                    >
                      <Avatar
                        alt={community?.communityName?.toUpperCase()}
                        variant="circle"
                        sx={{ marginRight: "5px" }}
                        src={`${imageURL}/render/image/${community?.communityPicture}`}
                      />
                      <p id="create-community">r/{community?.communityName}</p>
                      {/* {query === "header" ? <StarBorderIcon id="star" /> : null} */}
                    </div>
                  );
                })}
            </>
          ) : null}
          {userModCommunities?.length > 0 ? (
            <>
              <p id="your-community">Mods</p>
              {userModCommunities &&
                userModCommunities?.map((community, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        communityClicked(community?.communityName, query);
                        setDropdown(false);
                      }}
                      className="community-list"
                    >
                      <Avatar
                        alt={community?.communityName?.toUpperCase()}
                        variant="circle"
                        sx={{ marginRight: "5px" }}
                        src={`${imageURL}/render/image/${community?.communityPicture}`}
                      />
                      <p id="create-community">r/{community?.communityName}</p>
                      {/* {query === "header" ? <StarBorderIcon id="star" /> : null} */}
                    </div>
                  );
                })}
            </>
          ) : null}

          {userCreatedCommunities?.length > 0 ? (
            <>
              <p id="your-community">Your Communities</p>
              {userCreatedCommunities &&
                userCreatedCommunities?.map((community, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        communityClicked(community?.communityName, query);
                        setDropdown(false);
                      }}
                      className="community-list"
                    >
                      <Avatar
                        alt={community?.communityName?.toUpperCase()}
                        variant="circle"
                        sx={{ marginRight: "5px" }}
                        src={`${imageURL}/render/image/${community?.communityPicture}`}
                      />
                      <p id="create-community">r/{community?.communityName}</p>
                      {/* {query === "header" ? <StarBorderIcon id="star" /> : null} */}
                    </div>
                  );
                })}
            </>
          ) : null}
          {query === "header" ? (
            <>
              <p id="feeds">FEEDS</p>
              <div
                onClick={() => navigateHandler("home")}
                className="feed-options-container"
              >
                <HomeIcon />
                <p id="feed-option">Home</p>
              </div>
              <div
                onClick={() => navigateHandler("profile")}
                className="feed-options-container"
              >
                <AccountBoxIcon />
                <p id="feed-option">Profile</p>
              </div>
              {/* <div className="feed-options-container">
                <GraphicEqIcon />
                <p id="feed-option">All</p>
              </div> */}
              <p id="other">OTHER</p>
              {/* <div className="other-options-container">
                <AddOutlinedIcon />
                <p id="other-option">User Settings</p>
              </div> */}
              {/* <div className="other-options-container">
                <NotificationsNoneOutlined />
                <p id="other-option">Notifications</p>
              </div>
              <div className="other-options-container">
                <EmojiEventsIcon />
                <p id="other-option">Top Communities</p>
              </div> */}
              <div
                onClick={() => navigateHandler("create-post")}
                className="other-options-container"
              >
                <AddOutlinedIcon />
                <p id="other-option">Create Post</p>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default DropDown;
