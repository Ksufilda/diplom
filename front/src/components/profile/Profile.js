import React, { useEffect, useState } from "react";
import "./profile.css";
import defaultPicture from "../../assets/default-picture.png";
import storage from "../../common/firebase";

const Profile = ({ redact, profile, changeProfile }) => {
  const [name, setName] = useState(profile.name);
  const [text1, setText1] = useState(profile.text1);
  const [text2, setText2] = useState(profile.text2);
  const [text3, setText3] = useState(profile.text3);
  const [profileImg, setProfileImg] = useState(profile.profileimg || "");
  const [imageLoading, setImageLoading] = useState(false);

  async function loadImage(image) {
    console.log("asdasd");
    setImageLoading(true);
    const itemImage = Math.random() * Math.floor(Math.random() * Date.now());
    if (image == null) return;
    await storage.ref(`/${itemImage}`).put(image);
    await storage
      .ref(`/${itemImage}`)
      .getDownloadURL()
      .then((url) => {
        setProfileImg(url);
        setImageLoading(false);
      });
  }

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
      id: profile.id,
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
        <div>
          <input
            disabled={!redact}
            type="file"
            name="profile-img-file"
            id="profile-img-file"
            className="file-input-hidden"
            onChange={(e) => {
              loadImage(e.target.files[0]);
            }}
          />
          <label htmlFor="profile-img-file">
            <div
              className={`${"opacity-hover-btn"}${!redact ? " disabled" : ""}`}
            >
              <img
                className="profile-header-image"
                src={profileImg || defaultPicture}
                alt="test"
              ></img>

              {imageLoading && (
                <div className="cross">
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
        <input
          disabled={!redact}
          style={{ overflow: "auto", width: "100%" }}
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          maxLength={20}
          className="profile-header-nickname"
        ></input>
      </div>
      <div className="profile-notes-block">
        <div className="profile-notes-block-el">
          <textarea
            placeholder={
              redact ? "Сюда вы можете ввести любую информацию о себе" : ""
            }
            disabled={!redact}
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
            disabled={!redact}
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
            disabled={!redact}
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
