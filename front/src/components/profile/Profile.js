import React, { useEffect, useState } from "react";
import "./profile.css";
import ksuna from "../../assets/ksunaImage.png";

const Profile = ({ profile, changeProfile }) => {
  const [name, setName] = useState(profile.name || "");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    onChangeProfile();
  }, [name, text1, text2, text3, profileImg]);

  function onChangeProfile() {
    const data = {
      id: 1,
      name,
      profileImg,
      text1,
      text2,
      text3,
    };

    changeProfile(data);
  }

  function adjustTextarea(e) {
    const el = e.target;
    console.log(el.style.height, el.scrollHeight, el.clientHeight);
    el.style.height = "1px";

    el.style.height = el.scrollHeight + "px";
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          className="profile-header-image"
          src={profileImg || ksuna}
          alt="test"
        ></img>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          maxLength={14}
          className="profile-header-nickname"
        ></input>
      </div>
      <div className="profile-notes-block">
        <div className="profile-notes-block-el">
          <textarea
            onChange={(e) => {
              adjustTextarea(e);
              setText1(e.target.value);
            }}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
        <div className="profile-notes-block-el">
          <textarea
            onChange={(e) => {
              adjustTextarea(e);
              setText2(e.target.value);
            }}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
        <div className="profile-notes-block-el">
          <textarea
            onChange={(e) => {
              adjustTextarea(e);
              setText3(e.target.value);
            }}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Profile;
