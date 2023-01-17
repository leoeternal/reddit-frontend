import React from "react";
import Avatar from "@mui/material/Avatar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import Tooltip from "@mui/material/Tooltip";
import "./createPostHome.css";

function CreatePostHome({ actionHandlerHome, loggedInUserInfo }) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  return (
    <div className="createposthome-wrapper">
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <Avatar
          alt={loggedInUserInfo?.username?.toUpperCase()}
          src={`${imageURL}/render/image/${loggedInUserInfo?.picture}`}
        />
        {loggedInUserInfo?.active ? (
          <FiberManualRecordIcon
            sx={{
              fontSize: "20px",
              color: "rgb(113,206,109)",
              position: "absolute",
              right: "-5px",
              bottom: "-4px",
            }}
          />
        ) : null}
      </div>
      <div className="search">
        <input
          onClick={() => actionHandlerHome("input-clicked", {})}
          type="text"
          placeholder="Create Post"
        />
      </div>
      <Tooltip title="Create Media Post">
        <InsertPhotoOutlinedIcon
          onClick={() => actionHandlerHome("galleryicon-clicked", {})}
          id="gallery-icon"
        />
      </Tooltip>
    </div>
  );
}

export default CreatePostHome;
