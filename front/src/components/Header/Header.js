import React, { useState } from "react";
import "./header.css";
import defaultPicture from "../../assets/default-picture.png";
import share from "../../assets/share.png";

export default function Header({
  redact,
  profile,
  saveProfile,
  changeView,
  userId,
  loggedIn,
  newProfileHint,
}) {
  const [showLinkCopy, setShowLinkCopy] = useState(false);

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    document.location.reload(true);
  }

  function sharePageLink() {
    const url = window.location.href + userId;
    navigator.clipboard.writeText(url);

    setShowLinkCopy(true);
    setTimeout(() => {
      setShowLinkCopy(false);
    }, 1000);
  }
  return (
    <div className="header-container">
      {redact && (
        <div style={{ position: "relative" }}>
          {newProfileHint === 2 && (
            <div className="new-profile-hint bottom">
              <p>Сохраните свой профиль</p>
            </div>
          )}
          <button
            className="save-btn"
            onClick={() => {
              saveProfile();
            }}
          >
            Сохранить страничку
          </button>
        </div>
      )}
      {loggedIn && (
        <button className="round-btn" onClick={sharePageLink}>
          <img src={share}></img>
        </button>
      )}

      {profile && (
        <div className="profile-mini-container">
          <p style={{ marginRight: 10 }}>
            {redact ? "Редактирование" : "Просмотр"}
          </p>

          <button
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
            onClick={changeView}
            className="round-btn"
          >
            <img
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: "100%",
                objectFit: "cover",
              }}
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

      <div className={`link-copy-modal${showLinkCopy ? " visible" : ""}`}>
        <img src={share}></img>
        <p>Ссылка скопирована</p>
      </div>
    </div>
  );
}
