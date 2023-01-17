import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllCommunitiesOfUser,
  topCommunities,
} from "../../store/CommunityAction";
import Layout from "../layout/Layout";
import "./home.css";
import { userActions } from "../../store/UserSlice";
import { loggedInUserInformation } from "../../store/UserAction";
import { getAllPosts, getAllPostsOfLoggedInUser } from "../../store/PostAction";
import { postActions } from "../../store/PostSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoggedIn, userAuth, userScreenLoader, loggedInUserInfo } =
    useSelector((state) => state.user);
  const { communityScreenLoader, topFiveCommunities } = useSelector(
    (state) => state.community
  );
  const { postScreenLoader, posts, postDeleted } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (postDeleted) {
      toast.success("Post deleted", {
        toastId: 1,
      });
    }
    dispatch(postActions.updatePostDeletedVaue());
  }, [postDeleted, dispatch]);

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(
        userActions.updateDropdownTitleValue({
          name: "Home",
          image: <HomeIcon />,
          type: "icon",
        })
      );
      dispatch(userActions.updateUserScreenLoaderValue());
      dispatch(loggedInUserInformation());
      dispatch(getAllCommunitiesOfUser());
    }
  }, [userLoggedIn, dispatch]);

  useEffect(() => {
    dispatch(postActions.updatePostScreenLoaderValue());
    if (userLoggedIn) {
      dispatch(getAllPostsOfLoggedInUser());
    } else {
      dispatch(getAllPosts());
    }
    dispatch(topCommunities());
  }, [dispatch, userLoggedIn]);

  useEffect(() => {
    if (userAuth) {
      navigate("/login");
    }
  }, [userAuth, navigate]);

  const actionHandlerHome = (action) => {
    if (action === "input-clicked") {
      navigate("/submit");
    } else if (action === "galleryicon-clicked") {
      navigate("/submit?media=true");
    } else if (action === "login") {
      navigate("/login");
    } else if (action === "register") {
      navigate("/register");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      {communityScreenLoader ||
      (userLoggedIn && userScreenLoader) ||
      postScreenLoader ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Layout
          query={"home"}
          data={{
            userLoggedIn,
            actionHandlerHome,
            loggedInUserInfo,
            posts,
            topFiveCommunities,
          }}
        />
      )}
    </>
  );
}

export default Home;
