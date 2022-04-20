import React from "react";
import "./profile.css";
import ksuna from "../../assets/ksunaImage.png";

const Profile = () => {
  function adjustTextarea(e) {
    const el = e.target;
    console.log(el.style.height, el.scrollHeight, el.clientHeight);
    el.style.height = "1px";

    el.style.height = el.scrollHeight + "px";
  }
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-header-image" src={ksuna} alt="test"></img>
        <p className="profile-header-nickname">{"Ksuna"}</p>
      </div>
      <div className="profile-notes-block">
        <div className="profile-notes-block-el">
          <textarea
            onChange={(e) => adjustTextarea(e)}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
        <div className="profile-notes-block-el">
          <textarea
            onChange={(e) => adjustTextarea(e)}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
        <div className="profile-notes-block-el">
          <textarea
            onChange={(e) => adjustTextarea(e)}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Profile;
