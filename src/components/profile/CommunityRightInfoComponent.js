import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./communityRightInfoComponent.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { communityActions } from "../../store/CommunitySlice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
function CommunityRightInfoComponent({ data = {} }) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentCommunity,
    actionHandlerHome,
    loggedInUserInfo,
    userLoggedIn,
    createPostStatus,
  } = data;
  const [bio, setBio] = useState(currentCommunity?.description);
  const { communityButtonLoader, bioTextarea } = useSelector(
    (state) => state.community
  );

  const communityNameClickedHandler = () => {
    navigate(`/r/${currentCommunity?.communityName}`);
  };
  return (
    <div className="communityright-wrapper">
      <div className="community-header">
        <p>About Community</p>
      </div>
      {createPostStatus ? (
        <div className="picture-name-container">
          <Avatar
            alt={currentCommunity?.communityName?.toUpperCase()}
            variant="circle"
            src={`${imageURL}/render/image/${currentCommunity?.communityPicture}`}
          />
          <p
            onClick={communityNameClickedHandler}
            style={{ marginLeft: "5px", cursor: "pointer" }}
          >
            r/{currentCommunity?.communityName}
          </p>
        </div>
      ) : null}

      <div className="desc-date-container">
        {userLoggedIn &&
        (currentCommunity?.createdBy?.id?._id?.toString() ===
          loggedInUserInfo._id?.toString() ||
          currentCommunity?.moderators?.some(
            (moderator) =>
              moderator?.id?._id?.toString() ===
                loggedInUserInfo?._id?.toString() &&
              moderator?.permissions?.includes("bio")
          )) ? (
          <>
            {(currentCommunity?.description === "" || bioTextarea) &&
            !createPostStatus ? (
              <>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Add description"
                />
                {bioTextarea || bio !== "" ? (
                  <>
                    {communityButtonLoader ? (
                      <>
                        <Button
                          disabled
                          size="small"
                          color="error"
                          variant="contained"
                        >
                          Submit
                        </Button>
                        {currentCommunity?.description !== "" ? (
                          <Button
                            sx={{ marginLeft: "10px" }}
                            size="small"
                            variant="outlined"
                            disabled
                          >
                            Cancel
                          </Button>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() =>
                            actionHandlerHome("bio-update", { bio })
                          }
                          size="small"
                          color="error"
                          variant="contained"
                        >
                          Submit
                        </Button>
                        {currentCommunity?.description !== "" ? (
                          <Button
                            sx={{ marginLeft: "10px" }}
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              dispatch(
                                communityActions.updateBioTextAreaValue()
                              )
                            }
                          >
                            Cancel
                          </Button>
                        ) : null}
                      </>
                    )}
                  </>
                ) : null}
              </>
            ) : (
              <p>
                {currentCommunity?.description}{" "}
                {!createPostStatus ? (
                  <EditIcon
                    onClick={() => {
                      setBio(currentCommunity?.description);
                      dispatch(communityActions.updateBioTextAreaValue());
                    }}
                    sx={{ cursor: "pointer", fontSize: "14px" }}
                  />
                ) : null}
              </p>
            )}
          </>
        ) : (
          <p>{currentCommunity?.description}</p>
        )}

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
        >
          <CakeOutlinedIcon />
          <p id="date">
            Created {moment(currentCommunity?.createdAt).format("MMM DD, YYYY")}
          </p>
        </div>
      </div>
      <div
        style={!userLoggedIn ? { border: "none" } : null}
        className="members-container"
      >
        <div className="total">
          <p id="value">{currentCommunity?.members?.length}</p>
          <p id="key">Members</p>
        </div>
        <div className="online">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FiberManualRecordIcon
              sx={{ fontSize: "10px", color: "green", marginRight: "2px" }}
            />
            <p id="value">
              {
                currentCommunity?.members?.filter((member) => {
                  return member?.id?.active === true;
                }).length
              }
            </p>
          </div>

          <p id="key">Online</p>
        </div>
      </div>
      {userLoggedIn ? (
        <>
          {!createPostStatus ? (
            <div className="createpost-container">
              <Button
                onClick={() => actionHandlerHome("create-post")}
                fullWidth
                size="small"
                variant="contained"
              >
                Create Post
              </Button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default CommunityRightInfoComponent;
