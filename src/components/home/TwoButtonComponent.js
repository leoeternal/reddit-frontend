import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { communityActions } from "../../store/CommunitySlice";
import "./twoButtonComponent.css";

function TwoButtonComponent({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoggedIn } = useSelector((state) => state.user);

  const buttonHandler = (status) => {
    if (userLoggedIn) {
      if (status === "create-community") {
        dispatch(communityActions.updateCommunityPopupValue());
      } else if (status === "create-post") {
        dispatch(navigate("/submit"));
      }
    } else {
      toast.error("You are not logged in");
    }
  };
  return (
    <div className="twobuttoncomponent-wrapper">
      <div className="banner"></div>
      <div className="reddit-logo-container">
        <div className="logo-name">
          <img
            src="https://www.allaboutlean.com/wp-content/uploads/2018/10/Reddit-Logo-NOTEXT-2.png"
            alt="reddit"
          />
          <p id="home-text">Home</p>
        </div>
        <div className="bio">
          <p>
            Your personal Reddit frontpage. Come here to check in with your
            favorite communities.
          </p>
        </div>
      </div>
      <div className="twobutton-container">
        <Button
          onClick={() => buttonHandler("create-post")}
          fullWidth
          color="error"
          size="small"
          variant="contained"
        >
          Create Post
        </Button>
        <Button
          sx={{ marginTop: "10px" }}
          fullWidth
          size="small"
          variant="outlined"
          onClick={() => buttonHandler("create-community")}
        >
          Create Community
        </Button>
      </div>
    </div>
  );
}

export default TwoButtonComponent;
