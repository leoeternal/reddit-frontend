import React from "react";
import { Avatar, CircularProgress } from "@mui/material";
import "./search.css";

function Search({
  searchLoader,
  type,
  searchCommunities,
  searchUsers,
  searchNavigateHandler,
}) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  return (
    <div className="search-wrapper">
      {searchLoader ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <CircularProgress size="1rem" />
        </div>
      ) : (
        <>
          {searchCommunities?.length === 0 && searchUsers?.length === 0 ? (
            <p
              style={{ textAlign: "center", padding: "10px", fontSize: "15px" }}
            >
              Nothing found
            </p>
          ) : (
            <>
              {searchCommunities?.length > 0 ? (
                <div className="community-container">
                  <p id="title">Communities</p>

                  {searchCommunities?.map((community, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() =>
                          searchNavigateHandler(
                            community?.communityName,
                            "community"
                          )
                        }
                        className="community"
                      >
                        <Avatar
                          alt={community?.communityName?.toUpperCase()}
                          variant="circle"
                          src={`${imageURL}/render/image/${community?.communityPicture}`}
                        />
                        <div className="name-members-container">
                          <p id="name">r/{community?.communityName}</p>
                          <p id="details">
                            Community . {community?.members?.length} members
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {searchCommunities?.length === 0 ||
              searchUsers?.length === 0 ? null : (
                <hr style={{ marginTop: "10px" }} />
              )}
              {searchUsers?.length > 0 ? (
                <div className="user-container">
                  <p id="title">People</p>
                  {searchUsers?.map((user, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() =>
                          searchNavigateHandler(user?.username, "user")
                        }
                        className="people"
                      >
                        <Avatar
                          alt={user?.username?.toUpperCase()}
                          variant="circle"
                          src={`${imageURL}/render/image/${user?.picture}`}
                        />
                        <div className="name-members-container">
                          <p id="name">u/{user?.username}</p>
                          <p id="details">User . {user?.karma} karma</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
