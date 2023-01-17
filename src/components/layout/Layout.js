import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/UserSlice";
import HomeLeftComponent from "../home/HomeLeftComponent";
import HomeRightComponent from "../home/HomeRightComponent";
import CreatePostLeftComponent from "../post/CreatePostLeftComponent";
import CreatePostProfileRightComponent from "../post/CreatePostProfileRightComponent";
import CreatePostRulesRightComponent from "../post/CreatePostRulesRightComponent";
import PostInfoLeftComponent from "../post/PostInfoLeftComponent";
import CommunityLeftComponent from "../profile/CommunityLeftComponent";
import CommunityRightComponent from "../profile/CommunityRightComponent";
import UserProfilePosts from "../profile/UserProfilePosts";
import UserProfileRightComponent from "../profile/UserProfileRightComponent";
import "./layout.css";

function Layout({ query, data = {} }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (query === "create-post" && data?.communityName !== undefined) {
      dispatch(
        userActions.updateCreatePostDropdownTitleValue({
          id: data?.currentCommunity?._id,
          image: data?.currentCommunity?.communityPicture,
          name: data?.currentCommunity?.communityName,
          type: "community",
        })
      );
    } else if (query === "create-post" && data?.username !== undefined) {
      dispatch(
        userActions.updateCreatePostDropdownTitleValue({
          id: data?.loggedInUserInfo?._id,
          image: data?.loggedInUserInfo?.picture,
          name: data?.loggedInUserInfo?.username,
          type: "user",
        })
      );
    }
  }, [
    query,
    dispatch,
    data.currentCommunity,
    data.communityName,
    data.loggedInUserInfo,
    data.username,
  ]);

  return (
    <>
      <div className="layout-wrapper">
        <div className="left-component">
          {query === "home" ? <HomeLeftComponent data={data} /> : null}
          {query === "create-post" ? (
            <CreatePostLeftComponent data={data} />
          ) : null}
          {query === "show-community" ? (
            <CommunityLeftComponent data={data} />
          ) : null}
          {query === "show-user" && data?.type === "posts" ? (
            <UserProfilePosts data={data} />
          ) : null}
          {query === "post-info" ? <PostInfoLeftComponent data={data} /> : null}
        </div>
        <div className="right-component">
          <div className="sub-right-component">
            {query === "create-post" &&
            data?.communityName === undefined &&
            data?.username === undefined ? (
              <CreatePostRulesRightComponent />
            ) : null}
            {query === "create-post" && data?.communityName !== undefined ? (
              <CreatePostProfileRightComponent data={data} />
            ) : null}
            {query === "create-post" && data?.username !== undefined ? (
              <CreatePostProfileRightComponent data={data} />
            ) : null}
            {query === "show-community" ? (
              <CommunityRightComponent data={data} />
            ) : null}
            {query === "show-user" ? (
              <UserProfileRightComponent data={data} />
            ) : null}
            {query === "home" ? <HomeRightComponent data={data} /> : null}
            {query === "post-info" ? <CreatePostRulesRightComponent /> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
