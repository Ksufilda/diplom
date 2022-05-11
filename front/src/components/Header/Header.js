import React from "react";
import "./header.css";
import defaultPicture from "../../assets/default-picture.png";

export default function Header({ profile, saveProfile }) {
  return (
    <div className="header-container">
      <button
        className="save-btn"
        onClick={() => {
          saveProfile();
        }}
      >
        Сохранить страничку
      </button>
      {profile && (
        <button className="round-btn">
          <img
            src={profile.profileImg ? profile.profileImg : defaultPicture}
          ></img>
        </button>
      )}
    </div>
  );
}
