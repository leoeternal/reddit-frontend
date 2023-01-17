import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, CircularProgress, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import {
  deleteInvitedRequestToUser,
  getCommunityByName,
  inviteUserForMod,
  leaveMod,
} from "../../store/CommunityAction";
import { userActions } from "../../store/UserSlice";
import "./moderator.css";
import InviteModPopover from "./InviteModPopover";
import { communityActions } from "../../store/CommunitySlice";

function Moderator() {
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
    modInvited,
    leftAsMod,
  } = useSelector((state) => state.community);
  const { loggedInUserInfo, userAuth, userLoggedIn } = useSelector(
    (state) => state.user
  );
  const [inviteModOpen, setInviteModOpen] = useState(false);
  const [inviteUsername, setInviteUsername] = useState("");
  const [accessList, setAccessList] = useState([]);

  useEffect(() => {
    if (modInvited) {
      setInviteModOpen(false);
      setInviteUsername("");
      setAccessList([]);
      toast.success("Invite request has been sent to the user", {
        toastId: 1,
      });
      dispatch(communityActions.updateModInvitedValue());
    }
  }, [modInvited, dispatch]);

  useEffect(() => {
    if (leftAsMod) {
      toast.success("You are no longer a mod of this community", {
        toastId: 1,
      });
      dispatch(communityActions.updateLeftAsModValue());
    }
  }, [dispatch, leftAsMod]);

  useEffect(() => {
    if (userAuth) {
      navigate("/login");
    }
  }, [userAuth, navigate]);

  useEffect(() => {
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
    currentCommunity.communityName,
    currentCommunity.communityPicture,
  ]);

  const handleInviteModOpen = () => {
    setInviteModOpen(true);
  };

  const handleInviteModClose = () => {
    setInviteModOpen(false);
  };

  const actionHandler = (action, data) => {
    if (action === "communityName-clicked") {
      navigate(`/r/${data.communityName}`);
    } else if (action === "username-clicked") {
      navigate(`/user/${data.username}/posts`);
    } else if (action === "checkbox-handler") {
      if (data.status === false) {
        const list = accessList.filter((aList) => {
          return aList.permission !== data.permission;
        });
        setAccessList(list);
      } else {
        setAccessList([
          ...accessList,
          { status: data.status, permission: data.permission },
        ]);
      }
    } else if (action === "invite-user") {
      dispatch(
        inviteUserForMod({
          inviteUsername,
          accessList,
          communityName: currentCommunity.communityName,
        })
      );
    } else if (action === "delete-invite-request") {
      dispatch(deleteInvitedRequestToUser(data));
    } else if (action === "leave-mod") {
      dispatch(leaveMod(currentCommunity?._id));
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      {inviteModOpen ? (
        <InviteModPopover
          inviteModOpen={inviteModOpen}
          handleInviteModClose={handleInviteModClose}
          actionHandler={actionHandler}
          inviteUsername={inviteUsername}
          setInviteUsername={setInviteUsername}
          communityButtonLoader={communityButtonLoader}
        />
      ) : null}
      {communityScreenLoader ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="moderator-wrapper">
          <div className="header">
            <Avatar
              alt={currentCommunity?.communityName?.toUpperCase()}
              variant="circle"
              sx={{ width: "30px", height: "30px", fontSize: "15px" }}
              src={`${imageURL}/render/image/${currentCommunity?.communityPicture}`}
            />
            <p id="header-title">
              <span
                onClick={() =>
                  actionHandler("communityName-clicked", currentCommunity)
                }
                style={{ color: "rgb(69,130,208)", cursor: "pointer" }}
              >
                R/{currentCommunity?.communityName}
              </span>{" "}
              / MODERATORS
            </p>
          </div>
          <div className="moderator-container">
            <div className="invite-button-container">
              <p id="title">
                Moderators of r/{currentCommunity?.communityName}
              </p>

              <div>
                {userLoggedIn &&
                currentCommunity?.moderators?.find((mod) => {
                  return (
                    mod?.id?._id?.toString() ===
                    loggedInUserInfo?._id?.toString()
                  );
                }) !== undefined ? (
                  <>
                    {communityButtonLoader ? (
                      <Button id="mod-button" disabled variant="outlined">
                        Leave as mod
                      </Button>
                    ) : (
                      <Button
                        onClick={() => actionHandler("leave-mod", {})}
                        variant="outlined"
                        id="mod-button"
                      >
                        Leave as mod
                      </Button>
                    )}
                  </>
                ) : null}
                {userLoggedIn &&
                currentCommunity?.createdBy?.id?._id?.toString() ===
                  loggedInUserInfo?._id ? (
                  <Button
                    onClick={handleInviteModOpen}
                    sx={{ marginLeft: "10px" }}
                    variant="contained"
                    id="mod-button"
                  >
                    Invite user as mod
                  </Button>
                ) : null}
              </div>
            </div>
            <div className="search-modlist-container">
              <div className="search">
                <input placeholder="Search for a mod" />
                <SearchIcon sx={{ cursor: "pointer" }} />
              </div>
              <div
                onClick={() =>
                  actionHandler(
                    "username-clicked",
                    currentCommunity?.createdBy?.id
                  )
                }
                className="mod"
              >
                <Avatar
                  alt={currentCommunity?.createdBy?.id?.username?.toUpperCase()}
                  variant="circle"
                  src={`${imageURL}/render/image/${currentCommunity?.createdBy?.id?.picture}`}
                />
                <p style={{ marginLeft: "5px" }}>
                  {currentCommunity?.createdBy?.id?.username}
                </p>
              </div>
              {currentCommunity?.moderators?.map((mod, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => actionHandler("username-clicked", mod?.id)}
                    className="mod"
                  >
                    <Avatar
                      alt={mod?.id?.username?.toUpperCase()}
                      variant="circle"
                      src={`${imageURL}/render/image/${mod?.id?.picture}`}
                    />
                    <p style={{ marginLeft: "5px" }}>{mod?.id?.username}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {currentCommunity?.invitedUsersForMod?.length > 0 ? (
            <div style={{ padding: "0 15px" }} className="moderator-container">
              <div className="invite-button-container">
                <p id="title">Invited moderators</p>
              </div>
              <div className="search-modlist-container">
                {currentCommunity?.invitedUsersForMod
                  ?.slice(0)
                  ?.reverse()
                  ?.map((mod, index) => {
                    return (
                      <div key={index} className="invited-mod">
                        <div
                          onClick={() =>
                            actionHandler("username-clicked", mod?.id)
                          }
                          className="invite-username-picture"
                        >
                          <Avatar
                            alt={mod?.id?.username?.toUpperCase()}
                            variant="circle"
                            src={`${imageURL}/render/image/${mod?.id?.picture}`}
                          />
                          <p style={{ marginLeft: "5px" }}>
                            {mod?.id?.username}
                          </p>
                        </div>
                        <p id="time">{moment(mod?.createdAt).fromNow()}</p>
                        <Tooltip title="Delete Request">
                          <IconButton>
                            {communityButtonLoader ? (
                              <DeleteIcon
                                sx={{
                                  color: "rgb(211, 211, 211)",
                                  cursor: "default",
                                }}
                              />
                            ) : (
                              <>
                                {userLoggedIn &&
                                currentCommunity?.createdBy?.id?._id?.toString() ===
                                  loggedInUserInfo?._id?.toString() ? (
                                  <DeleteIcon
                                    onClick={() =>
                                      actionHandler("delete-invite-request", {
                                        inviteId: mod?._id,
                                        notificationId: mod?.notificationId,
                                        userId: mod?.id?._id,
                                        communityId: currentCommunity?._id,
                                      })
                                    }
                                  />
                                ) : null}
                              </>
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Moderator;
