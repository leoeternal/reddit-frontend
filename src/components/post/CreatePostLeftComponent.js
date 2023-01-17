import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArticleIcon from "@mui/icons-material/Article";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DropDown from "../helperComponent/DropDown";
import "./createPost.css";
import { CircularProgress } from "@mui/material";

function CreatePostLeftComponent({ data }) {
  const {
    status,
    setStatus,
    userFollowCommunities,
    userCreatedCommunities,
    userModCommunities,
    communityClicked,
    title,
    text,
    community,
    setTitle,
    setText,
    submitHandler,
    postButtonLoader,
    user,
    uploadImageHandler,
    filename,
    tempImageUpload,
    tempImageInfo,
    removeImageHandler,
    getImageInfo,
  } = data;
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  return (
    <div className="createpost-wrapper">
      <p id="createpost-text">Create Post</p>
      <hr id="underline" />
      <div className="dropdown">
        <DropDown
          query={"create-post"}
          data={{
            userFollowCommunities,
            userCreatedCommunities,
            userModCommunities,
            communityClicked,
          }}
        />
      </div>
      <div className="post-container">
        <div className="level1">
          <div
            style={
              !status
                ? {
                    borderBottom: "1px solid blue",
                    backgroundColor: "rgb(244, 247, 255)",
                  }
                : null
            }
            onClick={() => setStatus(null)}
            className="level1-post"
          >
            {!status ? (
              <>
                <ArticleIcon sx={{ color: "#085eff" }} />
                <p style={{ margin: "0 5px", color: "#085eff" }}>Post</p>
              </>
            ) : (
              <>
                <ArticleIcon />
                <p style={{ margin: "0 5px" }}>Post</p>
              </>
            )}
          </div>
          <div
            style={
              status
                ? {
                    borderBottom: "1px solid blue",
                    backgroundColor: "rgb(244, 247, 255)",
                  }
                : null
            }
            onClick={() => setStatus(true)}
            className="level1-post"
          >
            {status ? (
              <>
                <AddPhotoAlternateIcon sx={{ color: "#085eff" }} />
                <p style={{ margin: "0 5px", color: "#085eff" }}>
                  Images & Video
                </p>
              </>
            ) : (
              <>
                <AddPhotoAlternateIcon />
                <p style={{ margin: "0 5px" }}>Images & Video</p>
              </>
            )}
          </div>
        </div>
        <div className="level2">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="textarea"
            placeholder="Title"
          ></textarea>
          {status ? (
            <div
              style={{
                borderStyle: "dotted",
                border: "1px solid rgb(211, 211, 211)",
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: tempImageUpload ? "20px" : 0,
              }}
            >
              {postButtonLoader ? (
                <div className="loader">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {tempImageUpload ? (
                    <div>
                      <img
                        src={`${imageURL}/render/image/${tempImageInfo?.filename}`}
                        alt="reddit"
                        style={{ width: "250px", height: "250px" }}
                        onLoad={getImageInfo}
                      />
                      <Tooltip title="Remove">
                        <CloseIcon
                          onClick={removeImageHandler}
                          sx={{ position: "absolute", cursor: "pointer" }}
                        />
                      </Tooltip>
                    </div>
                  ) : (
                    <Button variant="outlined" component="label">
                      Upload
                      <input
                        onChange={uploadImageHandler}
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                      />
                    </Button>
                  )}
                </>
              )}
            </div>
          ) : (
            <textarea
              rows={10}
              id="textarea"
              placeholder="Text (optional)"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          )}
        </div>
        <div className="level3">
          {((title === "" || community === "") &&
            (title === "" || user === "")) ||
          (status && filename === "") ? (
            <Button
              color="error"
              sx={{ borderRadius: "20px", marginLeft: "10px" }}
              size="small"
              variant="contained"
              disabled
            >
              Post
            </Button>
          ) : (
            <>
              {postButtonLoader ? (
                <Button
                  color="error"
                  sx={{ borderRadius: "20px", marginLeft: "10px" }}
                  size="small"
                  variant="contained"
                  disabled
                >
                  Post
                </Button>
              ) : (
                <Button
                  color="error"
                  sx={{ borderRadius: "20px", marginLeft: "10px" }}
                  size="small"
                  variant="contained"
                  onClick={submitHandler}
                >
                  Post
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePostLeftComponent;
