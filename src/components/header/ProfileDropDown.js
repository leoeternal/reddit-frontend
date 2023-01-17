import React, { useState } from "react";
import "./profileDropdown.css";
import Avatar from "@mui/material/Avatar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch } from "react-redux";
import { communityActions } from "../../store/CommunitySlice";
// import { useNavigate } from "react-router-dom";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

function ProfileDropDown({ actionHandler, userLoggedIn, loggedInUserInfo }) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <>
      <div
        onClick={() => setProfileDropdown(!profileDropdown)}
        style={
          profileDropdown ? { border: "1px solid rgb(217, 217, 217)" } : null
        }
        className="profile-selected-option"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Avatar
            alt={loggedInUserInfo?.username?.toUpperCase()}
            variant="square"
            sx={{ width: "30px", height: "30px" }}
            src={
              userLoggedIn
                ? `${imageURL}/render/image/${loggedInUserInfo?.picture}`
                : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
            }
          />
          {loggedInUserInfo?.active ? (
            <FiberManualRecord
              sx={{
                fontSize: "20px",
                color: "rgb(113,206,109)",
                position: "absolute",
                right: "-8px",
                bottom: "-8px",
              }}
            />
          ) : null}
        </div>
        <div>
          <KeyboardArrowDownIcon sx={{ color: "rgb(158,161,162)" }} />
        </div>
      </div>
      {profileDropdown ? (
        <div className="profile-options">
          {userLoggedIn ? (
            <>
              <p id="stuff">My Stuff</p>
              <p
                onClick={() => {
                  actionHandler("profile-clicked");
                  setProfileDropdown(false);
                }}
                className="my-stuff"
              >
                Profile
              </p>
              {/* <p className="my-stuff">User Settings</p> */}
              <hr style={{ margin: "10px 0" }} />
            </>
          ) : null}
          {userLoggedIn ? (
            <>
              <div
                onClick={() => {
                  dispatch(communityActions.updateCommunityPopupValue());
                  setProfileDropdown(!profileDropdown);
                }}
                className="setting-options-container"
              >
                <AddOutlinedIcon />
                <p id="feed-option">Create Community</p>
              </div>
              <div
                onClick={() => {
                  actionHandler("create-post");
                  setProfileDropdown(!profileDropdown);
                }}
                className="setting-options-container"
              >
                <AddOutlinedIcon />
                <p id="feed-option">Create post</p>
              </div>
            </>
          ) : (
            <>
              <div className="setting-options-container">
                <AddOutlinedIcon />
                <p id="feed-option">Explore</p>
              </div>
              <div className="setting-options-container">
                <AddOutlinedIcon />
                <p id="feed-option">Coins</p>
              </div>
            </>
          )}

          <hr style={{ margin: "10px 0" }} />
          {userLoggedIn ? (
            <div
              onClick={() => actionHandler("logout")}
              className="setting-options-container"
            >
              <LogoutIcon />
              <p id="feed-option">Log Out</p>
            </div>
          ) : (
            <div
              onClick={() => actionHandler("login")}
              className="setting-options-container"
            >
              <AccountCircleOutlinedIcon />
              <p id="feed-option">Sign Up or Log In</p>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default ProfileDropDown;
