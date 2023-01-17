import React from "react";
import TopCommunityBox from "../home/TopCommunityBox";
import UserProfileRightInformation from "./UserProfileRightInformation";

function UserProfileRightComponent({ data }) {
  return (
    <>
      <UserProfileRightInformation data={data} />
      {data?.userLoggedIn ? (
        <TopCommunityBox
          data={{
            topFiveCommunities: data?.userCreatedCommunities,
            userModCommunities: data?.userModCommunities,
            userProfile: true,
          }}
        />
      ) : null}
    </>
  );
}

export default UserProfileRightComponent;
