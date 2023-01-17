import React from "react";
import "./createPostRulesRightComponent.css";

function CreatePostRulesRightComponent() {
  return (
    <div className="rules-wrapper">
      <div className="title">
        <img
          src="https://www.redditstatic.com/avatars/avatar_default_03_FF4500.png"
          alt="reddit"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <p>Posting to Reddit</p>
      </div>
      <hr />
      <div className="point">
        <p>1. Remember the human</p>
      </div>

      <div className="point">
        <p>2. Behave like you would in real life</p>
      </div>

      <div className="point">
        <p>3. Look for the original source of content</p>
      </div>

      <div className="point">
        <p>4. Search for duplicates before posting</p>
      </div>

      <div className="point">
        <p>5. Read the community’s rules</p>
      </div>
    </div>
  );
}

export default CreatePostRulesRightComponent;
