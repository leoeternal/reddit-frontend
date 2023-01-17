import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "./communityDialogBox.css";
import { useDispatch, useSelector } from "react-redux";
import { communityActions } from "../../store/CommunitySlice";
import { createCommunity } from "../../store/CommunityAction";
import { useNavigate } from "react-router-dom";
import { loggedInUserInformation } from "../../store/UserAction";

function CommunityDialogBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [communityName, setCommunityName] = useState("");
  const [type, setType] = useState("public");
  const { communityButtonLoader, communityCreated, currentCommunity } =
    useSelector((state) => state.community);

  useEffect(() => {
    if (communityCreated) {
      dispatch(loggedInUserInformation());
      dispatch(communityActions.updateCommunityPopupValue());
      navigate(`/r/${currentCommunity?.communityName}`);
      dispatch(communityActions.updateCommunityCreatedValue());
    }
  }, [communityCreated, currentCommunity, navigate, dispatch]);

  const createCommunityHandler = () => {
    dispatch(communityActions.updateCommunityButtonLoaderValue());
    dispatch(createCommunity({ communityName, type }));
  };

  return (
    <div className="community-dialogbox-wrapper">
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create a community"}
        </DialogTitle>
        <hr style={{ margin: "0 25px" }} />
        <DialogContent>
          <p>Name</p>
          <p id="name-subheading">
            Community names including capitalization cannot be changed.
          </p>
          <TextField
            id="outlined-basic"
            sx={{ width: "500px", margin: "20px 0" }}
            label="r/"
            variant="outlined"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
          />
          <p>Community Type</p>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="public"
              name="radio-buttons-group"
              onChange={(e) => setType(e.target.value)}
            >
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="restricted"
                control={<Radio />}
                label="Restricted"
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {communityButtonLoader ? (
            <>
              <Button variant="outlined" disabled>
                Cancel
              </Button>
              <Button disabled variant="contained" autoFocus>
                Create Community
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() =>
                  dispatch(communityActions.updateCommunityPopupValue())
                }
              >
                Cancel
              </Button>
              <Button
                onClick={createCommunityHandler}
                variant="contained"
                autoFocus
              >
                Create Community
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommunityDialogBox;
