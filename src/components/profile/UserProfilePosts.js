import React from "react";
import Post from "../post/Post";

function UserProfilePosts({ data }) {
  const { currentUser } = data;
  return (
    <>
      {currentUser?.posts?.length === 0 ? (
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
                margin: "10px 0",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              hmmm... u/{currentUser?.username} hasn't posted anything
            </p>
          </div>
        </div>
      ) : (
        <>
          {currentUser?.posts
            ?.slice(0)
            ?.reverse()
            ?.map((post, index) => {
              return (
                <Post
                  key={index}
                  currentPost={post?.id}
                  type={post?.id?.postedForType === "community" ? "r" : "user"}
                  comment={false}
                />
              );
            })}
        </>
      )}
    </>
  );
}

export default UserProfilePosts;
