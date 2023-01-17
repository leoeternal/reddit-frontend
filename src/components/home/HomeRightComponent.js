import React from "react";
import TopCommunityBox from "./TopCommunityBox";
import TwoButtonComponent from "./TwoButtonComponent";

function HomeRightComponent({ data }) {
  return (
    <>
      {data?.topFiveCommunities?.length > 0 ? (
        <TopCommunityBox data={data} />
      ) : null}

      <TwoButtonComponent data={data} />
    </>
  );
}

export default HomeRightComponent;
