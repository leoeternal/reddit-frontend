import React from "react";
// import Button from "@mui/material/Button";
import "./communityRightModeratorComponent.css";

function CommunityRightModeratorComponent({ data = {} }) {
  const { currentCommunity, actionHandlerHome } = data;
  return (
    <div className="communityright-wrapper">
      <div className="community-header">
        <p>Moderators</p>
      </div>
      <div className="mod-body">
        <>
          {/* <Button sx={{ marginBottom: "15px" }} fullWidth variant="outlined">
              Message the mods
            </Button> */}
          <p
            onClick={() =>
              actionHandlerHome(
                "username-clicked",
                currentCommunity?.createdBy?.id
              )
            }
            id="mod-name"
          >
            u/{currentCommunity?.createdBy?.id?.username}
          </p>
          {currentCommunity?.moderators?.map((moderator, index) => {
            return (
              <div key={index}>
                <p
                  onClick={() =>
                    actionHandlerHome("username-clicked", moderator?.id)
                  }
                  id="mod-name"
                >
                  u/{moderator?.id?.username}
                </p>
              </div>
            );
          })}
          <p
            onClick={() => actionHandlerHome("view-moderator", data)}
            id="view-all"
          >
            VIEW ALL MODERATORS
          </p>
        </>
      </div>
    </div>
  );
}

export default CommunityRightModeratorComponent;
