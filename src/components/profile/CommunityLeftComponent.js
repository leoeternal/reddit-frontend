import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CreatePostHome from "../post/CreatePostHome";
import Post from "../post/Post";

function CommunityLeftComponent({ data }) {
  const { actionHandlerHome, loggedInUserInfo, currentCommunity } = data;
  const { userLoggedIn } = useSelector((state) => state.user);
  return (
    <>
      {userLoggedIn ? (
        <CreatePostHome
          loggedInUserInfo={loggedInUserInfo}
          actionHandlerHome={actionHandlerHome}
        />
      ) : null}
      {currentCommunity?.posts?.length === 0 ? (
        <div
          style={{
            height: !userLoggedIn ? "100%" : null,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "22px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              There are no posts in this subreddit
            </p>
            <p style={{ margin: "10px 0", textAlign: "center" }}>
              Be the first to till this fertile land.
            </p>
            {userLoggedIn ? (
              <Button
                onClick={() => actionHandlerHome("input-clicked")}
                variant="contained"
              >
                Add a post
              </Button>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  sx={{ marginRight: "10px" }}
                  onClick={() => actionHandlerHome("register")}
                  variant="outlined"
                >
                  SIGN UP
                </Button>
                <Button
                  onClick={() => actionHandlerHome("login")}
                  variant="contained"
                >
                  LOG IN
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {currentCommunity?.posts
            ?.slice(0)
            ?.reverse()
            ?.map((post, index) => {
              return (
                <Post
                  key={index}
                  currentPost={post?.postId}
                  type={
                    post?.postId?.postedForType === "community" ? "r" : "user"
                  }
                  comment={false}
                />
              );
            })}
        </>
      )}
    </>
  );
}

export default CommunityLeftComponent;
