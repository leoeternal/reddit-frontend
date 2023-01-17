import React from "react";
import CommunityRightComponent from "../profile/CommunityRightComponent";
import UserProfileRightComponent from "../profile/UserProfileRightComponent";
import CreatePostRulesRightComponent from "./CreatePostRulesRightComponent";

function CreatePostProfileRightComponent({ data }) {
  return (
    <div className="createpost-profile-wrapper">
      {data?.communityName !== undefined ? (
        <CommunityRightComponent data={data} />
      ) : null}
      {data?.username !== undefined ? (
        <UserProfileRightComponent data={data} />
      ) : null}
      <br />
      <CreatePostRulesRightComponent />
    </div>
  );
}

export default CreatePostProfileRightComponent;
