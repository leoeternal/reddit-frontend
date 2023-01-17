import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

function ProfilePictureUploadDiaglog({
  openProfilePictureDialog,
  handleCloseProfilePictureDialog,
  userButtonLoader,
  uploadImageHandler,
  filename,
  userTempImageUpload,
  userTempImageInfo,
  userRemoveImageHandler,
  actionHandlerHome,
}) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  return (
    <>
      <Dialog
        open={openProfilePictureDialog}
        onClose={handleCloseProfilePictureDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Upload profile picture"}
        </DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <DialogContentText id="alert-dialog-description">
            {userTempImageUpload ? (
              <div>
                <img
                  src={`${imageURL}/render/image/${userTempImageInfo?.filename}`}
                  alt="reddit"
                  style={{ width: "250px", height: "250px" }}
                />
                <Tooltip title="Remove">
                  {userButtonLoader ? (
                    <CloseIcon
                      disabled
                      sx={{ position: "absolute", cursor: "pointer" }}
                    />
                  ) : (
                    <CloseIcon
                      onClick={userRemoveImageHandler}
                      sx={{ position: "absolute", cursor: "pointer" }}
                    />
                  )}
                </Tooltip>
              </div>
            ) : (
              <>
                {userButtonLoader ? (
                  <div className="loader">
                    <CircularProgress />
                  </div>
                ) : (
                  <Button
                    onChange={uploadImageHandler}
                    size="small"
                    variant="contained"
                    component="label"
                  >
                    Choose
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                )}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {filename === "" ? (
            <>
              <Button variant="outlined" color="error" disabled>
                Upload
              </Button>
              <Button onClick={handleCloseProfilePictureDialog} autoFocus>
                Cancel
              </Button>
            </>
          ) : (
            <>
              {userButtonLoader ? (
                <>
                  <Button variant="outlined" color="error" disabled>
                    Upload
                  </Button>
                  <Button
                    disabled
                    onClick={handleCloseProfilePictureDialog}
                    autoFocus
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => actionHandlerHome("upload-profile-picture")}
                  >
                    Upload
                  </Button>
                  <Button onClick={handleCloseProfilePictureDialog} autoFocus>
                    Cancel
                  </Button>
                </>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProfilePictureUploadDiaglog;
