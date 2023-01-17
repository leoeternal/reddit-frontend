import React from "react";
import Post from "../post/Post";

import CreatePostHome from "../post/CreatePostHome";
import { Button } from "@mui/material";

function HomeLeftComponent({ data }) {
  return (
    <>
      {data?.userLoggedIn ? (
        <CreatePostHome
          actionHandlerHome={data?.actionHandlerHome}
          loggedInUserInfo={data?.loggedInUserInfo}
        />
      ) : null}
      {data?.posts?.length === 0 ? (
        <div
          style={{
            height: "100%",
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
              There are no posts for you
            </p>
            <p style={{ margin: "10px 0", textAlign: "center" }}>
              Be the first to till this fertile land or start following people
              and communities.
            </p>
            {data?.userLoggedIn ? (
              <Button
                onClick={() => data.actionHandlerHome("input-clicked")}
                variant="contained"
              >
                Add a post
              </Button>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  sx={{ marginRight: "10px" }}
                  onClick={() => data.actionHandlerHome("register")}
                  variant="outlined"
                >
                  SIGN UP
                </Button>
                <Button
                  onClick={() => data.actionHandlerHome("login")}
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
          {data?.posts
            ?.slice(0)
            ?.reverse()
            ?.map((post, index) => {
              return (
                <Post
                  key={index}
                  currentPost={post}
                  type={post?.postedForType === "community" ? "r" : "user"}
                  comment={false}
                />
              );
            })}
        </>
      )}
    </>
  );
}

export default HomeLeftComponent;
