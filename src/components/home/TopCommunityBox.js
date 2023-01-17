import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import "./topCommunityBox.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  communityFollow,
  communityUnfollow,
} from "../../store/CommunityAction";
import { toast } from "react-toastify";
import { communityActions } from "../../store/CommunitySlice";
import { useNavigate } from "react-router-dom";

function TopCommunityBox({ data }) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    topFiveCommunities,
    userModCommunities = [],
    userProfile = false,
  } = data;
  const { loggedInUserInfo, userLoggedIn } = useSelector((state) => state.user);
  const { communityButtonLoader, communityFollowed, communityUnfollowed } =
    useSelector((state) => state.community);

  useEffect(() => {
    if (communityFollowed) {
      dispatch(
        communityActions.updateTopCommunitiesPostsArray({
          status: "join",
          loggedInUserId: loggedInUserInfo?._id,
        })
      );
      localStorage.removeItem("communityId");
    } else if (communityUnfollowed) {
      dispatch(
        communityActions.updateTopCommunitiesPostsArray({
          status: "joined",
          loggedInUserId: loggedInUserInfo?._id,
        })
      );
      localStorage.removeItem("communityId");
    }
    dispatch(communityActions.updateCommunityFollowedValue());
    dispatch(communityActions.updateCommunityUnfollowedValue());
  }, [dispatch, communityFollowed, loggedInUserInfo._id, communityUnfollowed]);

  const communityFollowUnfollowHandler = (status, communityId) => {
    if (userLoggedIn) {
      if (status === "join") {
        localStorage.setItem("communityId", communityId);
        dispatch(communityFollow({ communityId }));
      } else if (status === "joined") {
        localStorage.setItem("communityId", communityId);
        dispatch(communityUnfollow({ communityId }));
      }
    } else {
      toast.error("You are not logged in");
    }
  };

  const navigateHandler = (communityName) => {
    navigate(`/r/${communityName}`);
  };

  return (
    <div
      className={
        userProfile ? "not-topcommunitybox-wrapper" : "topcommunitybox-wrapper"
      }
    >
      {userProfile ? (
        <div className="not-header">
          <p id="title">You're a moderator of these communities</p>
        </div>
      ) : (
        <>
          <div className="header"></div>
          <p id="title">Top Communties</p>
        </>
      )}
      {topFiveCommunities?.map((community, index) => {
        return (
          <div key={index} className="community-info-box">
            {!userProfile ? <p id="index">{index + 1}.</p> : null}

            <Avatar
              alt={community?.communityName?.toUpperCase()}
              variant="circle"
              sx={{ width: "25px", height: "25px", marginRight: "5px" }}
              src={`${imageURL}/render/image/${community?.communityPicture}`}
            />
            <p
              onClick={() => navigateHandler(community?.communityName)}
              id="name"
            >
              r/{community?.communityName}
            </p>
            {!userProfile ? (
              <>
                {userLoggedIn &&
                community?.members?.find((member) => {
                  return (
                    member?.id?.toString() === loggedInUserInfo?._id?.toString()
                  );
                }) !== undefined ? (
                  <>
                    {communityButtonLoader ? (
                      <Button
                        disabled
                        id="join-button"
                        size="small"
                        variant="contained"
                      >
                        Joined
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          communityFollowUnfollowHandler(
                            "joined",
                            community?._id
                          )
                        }
                        id="join-button"
                        size="small"
                        variant="contained"
                      >
                        Joined
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    {communityButtonLoader ? (
                      <Button
                        disabled
                        id="join-button"
                        size="small"
                        variant="outlined"
                      >
                        Join
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          communityFollowUnfollowHandler("join", community?._id)
                        }
                        id="join-button"
                        size="small"
                        variant="outlined"
                      >
                        Join
                      </Button>
                    )}
                  </>
                )}
              </>
            ) : null}
          </div>
        );
      })}
      {userModCommunities?.map((community, index) => {
        return (
          <div key={index} className="community-info-box">
            {!userProfile ? <p id="index">{index + 1}.</p> : null}

            <Avatar
              alt={community?.communityName?.toUpperCase()}
              variant="circle"
              sx={{ width: "25px", height: "25px", marginRight: "5px" }}
              src={`${imageURL}/render/image/${community?.communityPicture}`}
            />
            <p
              onClick={() => navigateHandler(community?.communityName)}
              id="name"
            >
              r/{community?.communityName}
            </p>
            {!userProfile ? (
              <>
                {userLoggedIn &&
                community?.members?.find((member) => {
                  return (
                    member?.id?.toString() === loggedInUserInfo?._id?.toString()
                  );
                }) !== undefined ? (
                  <>
                    {communityButtonLoader ? (
                      <Button
                        disabled
                        id="join-button"
                        size="small"
                        variant="contained"
                      >
                        Joined
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          communityFollowUnfollowHandler(
                            "joined",
                            community?._id
                          )
                        }
                        id="join-button"
                        size="small"
                        variant="contained"
                      >
                        Joined
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    {communityButtonLoader ? (
                      <Button
                        disabled
                        id="join-button"
                        size="small"
                        variant="outlined"
                      >
                        Join
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          communityFollowUnfollowHandler("join", community?._id)
                        }
                        id="join-button"
                        size="small"
                        variant="outlined"
                      >
                        Join
                      </Button>
                    )}
                  </>
                )}
              </>
            ) : null}
          </div>
        );
      })}
      {/* <div className="viewall-button">
        <Button fullWidth size="small" variant="contained">
          View All
        </Button>
      </div> */}
    </div>
  );
}

export default TopCommunityBox;
