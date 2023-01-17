import AddOutlined from "@mui/icons-material/AddOutlined";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCommunityByName } from "../../store/CommunityAction";
import { communityActions } from "../../store/CommunitySlice";
import {
  createPost,
  deleteImage,
  uploadTempImage,
} from "../../store/PostAction";
import { postActions } from "../../store/PostSlice";
import { loggedInUserInformation } from "../../store/UserAction";
import { userActions } from "../../store/UserSlice";
import Layout from "../layout/Layout";

function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { communityName, username } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [status, setStatus] = useState(searchParams.get("media"));
  const { userLoggedIn, userScreenLoader, userAuth, loggedInUserInfo } =
    useSelector((state) => state.user);
  const {
    userFollowCommunities,
    userModCommunities,
    userCreatedCommunities,
    communityScreenLoader,
    currentCommunity,
  } = useSelector((state) => state.community);
  const {
    postButtonLoader,
    currentPost,
    postCreated,
    tempImageUpload,
    tempImageInfo,
  } = useSelector((state) => state.post);
  const [community, setCommunity] = useState("");
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("");
  const [imageInfo, setImageInfo] = useState({});

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [navigate, userLoggedIn]);

  useEffect(() => {
    if (communityName !== undefined) {
      dispatch(communityActions.updateCommunityScreenLoaderValue());
      dispatch(getCommunityByName(communityName));
    } else if (username !== undefined) {
      dispatch(userActions.updateUserScreenLoaderValue());
      dispatch(loggedInUserInformation());
    } else {
      dispatch(userActions.updateCreatePostDropdownTitleValue({}));
    }
  }, [dispatch, communityName, username]);

  useEffect(() => {
    if (userAuth) {
      navigate("/login");
    }
  }, [userAuth, navigate]);

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(
        userActions.updateDropdownTitleValue({
          name: "Create Post",
          image: <AddOutlined />,
          type: "icon",
        })
      );
    }
  }, [userLoggedIn, dispatch]);

  useEffect(() => {
    communityName !== undefined && setCommunity(communityName);
    username !== undefined && setUser(username);
  }, [communityName, username]);

  useEffect(() => {
    if (postCreated) {
      setText("");
      setTitle("");
      setCommunity("");
      setUser("");
      setFilename("");
      setImageInfo({});
      if (currentPost?.postedForType === "community") {
        navigate(
          `/r/${currentCommunity?.communityName}/comments/${currentPost?._id}/${currentPost?.title}`
        );
      } else {
        navigate(
          `/user/${loggedInUserInfo?.username}/comments/${currentPost?._id}/${currentPost?.title}`
        );
      }
      dispatch(postActions.updatePostCreatedValue());
    }
  }, [
    dispatch,
    navigate,
    postCreated,
    currentPost._id,
    currentCommunity.communityName,
    currentPost.title,
    currentPost.postedForType,
    loggedInUserInfo.username,
  ]);

  const communityClicked = (name, query) => {
    if (query === "create-post") {
      setCommunity(name);
      navigate(`/r/${name}/submit`);
    } else if (query === "user") {
      setUser(name);
      navigate(`/user/${name}/submit`);
    }
  };

  const submitHandler = () => {
    dispatch(postActions.updatePostButtonLoaderValue());
    if (communityName !== undefined) {
      if (status) {
        const data = {
          postedForType: "community",
          postedBy: { id: loggedInUserInfo?._id },
          postedForCommunity: { id: currentCommunity?._id },
          postType: "media",
          title,
          picture: tempImageInfo?.filename,
          pictureWidth: imageInfo?.width,
          pictureHeight: imageInfo?.height,
        };
        dispatch(createPost(data));
      } else {
        const data = {
          postedForType: "community",
          postedBy: { id: loggedInUserInfo?._id },
          postedForCommunity: { id: currentCommunity?._id },
          postType: "text",
          title,
          text,
        };
        dispatch(createPost(data));
      }
    } else {
      if (status) {
        const data = {
          postedForType: "user",
          postedBy: { id: loggedInUserInfo?._id },
          postedForUser: { id: loggedInUserInfo?._id },
          postType: "media",
          title,
          picture: tempImageInfo?.filename,
          pictureWidth: imageInfo?.width,
          pictureHeight: imageInfo?.height,
        };
        dispatch(createPost(data));
      } else {
        const data = {
          postedForType: "user",
          postedBy: { id: loggedInUserInfo?._id },
          postedForUser: { id: loggedInUserInfo?._id },
          postType: "text",
          title,
          text,
        };
        dispatch(createPost(data));
      }
    }
  };

  const uploadImageHandler = (e) => {
    setFilename(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    dispatch(uploadTempImage(formData));
  };

  const removeImageHandler = () => {
    dispatch(
      deleteImage({
        filename: tempImageInfo?.filename,
        fileId: tempImageInfo?.id,
      })
    );
  };

  const getImageInfo = ({ target: img }) => {
    setImageInfo({ width: img.naturalWidth, height: img.naturalHeight });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      {(communityName !== undefined && communityScreenLoader) ||
      (username !== undefined && userScreenLoader) ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Layout
          query={"create-post"}
          data={{
            status,
            setStatus,
            userFollowCommunities,
            userCreatedCommunities,
            userModCommunities,
            communityName,
            currentCommunity,
            communityClicked,
            username,
            loggedInUserInfo,
            text,
            title,
            userLoggedIn,
            community,
            setText,
            setTitle,
            setCommunity,
            submitHandler,
            postButtonLoader,
            user,
            createPostStatus: true,
            uploadImageHandler,
            filename,
            tempImageInfo,
            tempImageUpload,
            removeImageHandler,
            getImageInfo,
          }}
        />
      )}
    </>
  );
}

export default CreatePost;
