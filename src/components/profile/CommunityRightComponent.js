import React from "react";
import CommunityRightInfoComponent from "./CommunityRightInfoComponent";
import CommunityRightModeratorComponent from "./CommunityRightModeratorComponent";

function CommunityRightComponent({ data = {} }) {
  return (
    <>
      <CommunityRightInfoComponent data={data} />
      {!data?.createPostStatus ? (
        <CommunityRightModeratorComponent data={data} />
      ) : null}
    </>
  );
}

export default CommunityRightComponent;
