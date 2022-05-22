import React from "react";
import "./header.css";
import defaultPicture from "../../assets/default-picture.png";
import { getCookie } from "../../common/getCookie";

export default function Header({ redact, profile, saveProfile, changeView }) {
  function deleteAllCookies() {
    var cookies = getCookie("timeKey").split(";");
    console.log(cookies);

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    document.location.reload(true);
  }
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
      {document.cookie && (
        <button className="save-btn" onClick={deleteAllCookies}>
          Выход
        </button>
      )}
    </div>
  );
}
