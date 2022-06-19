import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import defaultPicture from "../../assets/default-picture.png";
import storage from "../../common/firebase";
import { deleteLink, postLink } from "../../api/queries";

const Profile = ({
  redact,
  profile,
  changeProfile,
  newProfileHint,
  setNewProfileHint,
}) => {
  const [name, setName] = useState(profile.name);
  const [text1, setText1] = useState(profile.text1);
  const [text2, setText2] = useState(profile.text2);
  const [text3, setText3] = useState(profile.text3);
  const [profileImg, setProfileImg] = useState(profile.profileimg || "");
  const [linkModalOpened, setLinkModalOpened] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [chosenLink, setChosenLink] = useState();
  const [linkText, setLinkText] = useState("");
  const [links, setLinks] = useState(profile.links || []);

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

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

  function redirectToLink(location) {
    window.location.replace(location);
    window.location.href = location;
  }

  function onChangeProfile() {
    const data = {
      id: profile.id,
      name,
      profileImg: profileImg,
      text1,
      text2,
      text3,
    };

    changeProfile(data);
  }

  function getSocialSrc(type) {
    switch (type) {
      case "telegram":
        return require("../../assets/Telegram.png");
      case "instagram":
        return require("../../assets/Instagram.png");
      case "none":
        return require("../../assets/link.png");

      default:
        break;
    }
  }

  function getLinkType(text) {
    if (text.includes("www.instagram.com")) return "instagram";
    return "none";
  }

  function deleteExistingLink() {
    const id = links[chosenLink].id;
    if (!id) return;

    const newLinks = links;

    setLinks(newLinks.filter((item) => item.id !== id));
    setLinkModalOpened(false);
    setChosenLink(undefined);

    deleteLink(links[chosenLink].id);
  }

  function addNewLink() {
    let id;
    if (chosenLink === -1) {
      id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    } else {
      id = links[chosenLink].id;
    }
    console.log(links[chosenLink]);
    const linkType = getLinkType(linkText);

    const newLinks = links;

    if (newLinks.findIndex((item) => item.id === id) !== -1) {
      newLinks[newLinks.findIndex((item) => item.id === id)] = {
        id,
        profileId: profile.id,
        link: linkText,
        type: linkType,
      };
      setLinks([...newLinks]);
    } else
      setLinks([
        ...newLinks,
        { id, profileId: profile.id, link: linkText, type: linkType },
      ]);

    setLinkModalOpened(false);
    setChosenLink(undefined);
    postLink({
      id,
      profileId: profile.id,
      link: linkText,
      type: linkType,
    });
  }

  function adjustTextarea(el) {
    el.style.height = "1px";

    el.style.height = el.scrollHeight + "px";
  }

  useEffect(() => {
    if (text1Ref.current) adjustTextarea(text1Ref.current);
    if (text2Ref.current) adjustTextarea(text2Ref.current);
    if (text3Ref.current) adjustTextarea(text3Ref.current);
  }, [text1Ref, text2Ref, text3Ref]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div>
          <input
            disabled={!redact}
            type="file"
            accept="image/png, image/jpeg"
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
        <div style={{ position: "relative" }}>
          {newProfileHint === 1 && (
            <div className="new-profile-hint">
              <p>Введите свой никнейм</p>
            </div>
          )}
          <input
            disabled={!redact}
            style={{ overflow: "auto", width: "100%" }}
            onFocus={() => setNewProfileHint(2)}
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            maxLength={20}
            className="profile-header-nickname"
          ></input>
        </div>
      </div>
      <div className="profile-notes-block">
        <div className="profile-notes-block-el">
          <textarea
            ref={text1Ref}
            placeholder={
              redact ? "Сюда вы можете ввести любую информацию о себе" : ""
            }
            disabled={!redact}
            onChange={(e) => {
              adjustTextarea(e.target);
              setText1(e.target.value);
            }}
            value={text1}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
        <div className="profile-notes-block-el">
          <textarea
            ref={text2Ref}
            disabled={!redact}
            onChange={(e) => {
              adjustTextarea(e.target);
              setText2(e.target.value);
            }}
            value={text2}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
        <div className="profile-notes-block-el">
          <textarea
            ref={text3Ref}
            disabled={!redact}
            onChange={(e) => {
              adjustTextarea(e.target);
              setText3(e.target.value);
            }}
            value={text3}
            className="profile-notes-block-el-textarea"
          ></textarea>
        </div>
      </div>
      <div className="social-links-container">
        {linkModalOpened && redact && (
          <div className="link-modal">
            <button
              className="close-btn"
              onClick={() => {
                setChosenLink(undefined);
                setLinkModalOpened(false);
              }}
            >
              x
            </button>
            <input
              placeholder="Ссылка"
              className="profile-notes-block-el-textarea"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              type={"text"}
            ></input>
            <button className="round-btn" onClick={() => addNewLink()}>
              <img src={require("../../assets/check.png")}></img>
            </button>

            {chosenLink !== -1 && (
              <button className="round-btn" onClick={deleteExistingLink}>
                <img src={require("../../assets/garbage.png")}></img>
              </button>
            )}
          </div>
        )}
        {links.map((item, index) => (
          <button
            onClick={
              redact
                ? () => {
                    setLinkText(item.link);

                    setLinkModalOpened(
                      linkModalOpened && chosenLink === index ? false : true
                    );
                    setChosenLink(
                      linkModalOpened && chosenLink === index
                        ? undefined
                        : index
                    );
                  }
                : () => redirectToLink(item.link)
            }
            className={`square-btn${chosenLink === index ? " pressed" : ""}`}
          >
            <img
              className="social-network-img"
              src={getSocialSrc(item.type)}
            ></img>
          </button>
        ))}

        {links.length < 5 && redact && (
          <button
            onClick={() => {
              setLinkText("");

              setLinkModalOpened(
                linkModalOpened && chosenLink === -1 ? false : true
              );
              setChosenLink(
                linkModalOpened && chosenLink === -1 ? undefined : -1
              );
            }}
            className={`square-btn${chosenLink === -1 ? " pressed" : ""}`}
          >
            <img
              className="social-network-img"
              src={require("../../assets/plusIcon.png")}
            ></img>
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
