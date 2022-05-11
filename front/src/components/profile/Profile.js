import React, { useEffect, useState } from "react";
import "./profile.css";
import defaultPicture from "../../assets/default-picture.png";

const Profile = ({ profile, changeProfile }) => {
  const [name, setName] = useState(profile.name);
  const [text1, setText1] = useState(profile.text1);
  const [text2, setText2] = useState(profile.text2);
  const [text3, setText3] = useState(profile.text3);
  const [profileImg, setProfileImg] = useState(profile.profileImg || "");

  useEffect(() => {
    onChangeProfile();
  }, [name, text1, text2, text3, profileImg]);

  useEffect(() => {
    setText1(profile.text1);
    setText2(profile.text2);
    setText3(profile.text3);
    setName(profile.name);
  }, [profile]);

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
    el.style.height = "1px";

    el.style.height = el.scrollHeight + "px";
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          className="profile-header-image"
          src={profileImg || defaultPicture}
          alt="test"
        ></img>
        <input
          style={{ overflow: "auto" }}
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
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
            value={text1}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
        <div className="profile-notes-block-el">
          <textarea
            onChange={(e) => {
              adjustTextarea(e);
              setText2(e.target.value);
            }}
            value={text2}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
        <div className="profile-notes-block-el">
          <textarea
            onChange={(e) => {
              adjustTextarea(e);
              setText3(e.target.value);
            }}
            value={text3}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Profile;
