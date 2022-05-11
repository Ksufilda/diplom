import React from "react";
import "./header.css";
import defaultPicture from "../../assets/default-picture.png";

export default function Header({ redact, profile, saveProfile, changeView }) {
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
        <div className="profile-mini-container">
          <p style={{ marginRight: 10 }}>
            {redact ? "Редактирование" : "Просмотр"}
          </p>

          <button onClick={changeView} className="round-btn">
            <img
              src={profile.profileImg ? profile.profileImg : defaultPicture}
            ></img>
          </button>
        </div>
      )}
    </div>
  );
}
