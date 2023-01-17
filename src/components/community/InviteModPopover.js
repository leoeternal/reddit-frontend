import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Checkbox from "@mui/material/Checkbox";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "./inviteModPopover.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function InviteModPopover({
  inviteModOpen,
  handleInviteModClose,
  actionHandler,
  inviteUsername,
  setInviteUsername,
  communityButtonLoader,
}) {
  return (
    <div className="inviteModPopover-wrapper">
      <Dialog
        open={inviteModOpen}
        onClose={handleInviteModClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Invite Moderators"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <hr />
            <div className="invite-search">
              <input
                value={inviteUsername}
                onChange={(e) => setInviteUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <p
              style={{
                margin: "15px 0",
                color: "black",
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              Give them access to...
            </p>
            <div className="checkbox-container">
              <Checkbox
                onChange={(e) =>
                  actionHandler("checkbox-handler", {
                    status: e.target.checked,
                    permission: "comment",
                  })
                }
                {...label}
              />
              <div>
                <p id="title">Manage Comments</p>
                <p id="sub-title">
                  A mod can delete comments of any post on this community.
                </p>
              </div>
            </div>
            <div className="checkbox-container">
              <Checkbox
                onChange={(e) =>
                  actionHandler("checkbox-handler", {
                    status: e.target.checked,
                    permission: "post",
                  })
                }
                {...label}
              />
              <div>
                <p id="title">Manage Posts</p>
                <p id="sub-title">A mod can delete posts on this community.</p>
              </div>
            </div>
            <div className="checkbox-container">
              <Checkbox
                onChange={(e) =>
                  actionHandler("checkbox-handler", {
                    status: e.target.checked,
                    permission: "bio",
                  })
                }
                {...label}
              />
              <div>
                <p id="title">Manage Bio</p>
                <p id="sub-title">A mod can manage bio of this community.</p>
              </div>
            </div>
            <div className="checkbox-container">
              <Checkbox
                onChange={(e) =>
                  actionHandler("checkbox-handler", {
                    status: e.target.checked,
                    permission: "picture",
                  })
                }
                {...label}
              />
              <div>
                <p id="title">Manage Community Picture</p>
                <p id="sub-title">
                  A mod can manage profile picture of this community.
                </p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleInviteModClose}>
            Cancel
          </Button>
          {inviteUsername === "" || communityButtonLoader ? (
            <Button color="error" variant="contained" disabled autoFocus>
              Invite
            </Button>
          ) : (
            <Button
              color="error"
              variant="contained"
              onClick={() => actionHandler("invite-user", {})}
              autoFocus
            >
              Invite
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InviteModPopover;
