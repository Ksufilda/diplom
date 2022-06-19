import React, { useState } from "react";
import "./modal.css";
import photoPlaceholder from "../../../assets/photoPlaceholder.jpeg";
import videoPlaceholder from "../../../assets/videoPlaceholder.jpeg";
import storage from "../../../common/firebase";

export default function BlockEditorModal({
  onDismiss,
  blockProps,
  addBlock,
  chosenBlock,
}) {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [mediaType, setMediaType] = useState("");

  const [mediaLoading, setMediaLoading] = useState(false);
  const [loadedImage, setLoadedImage] = useState();

  function changeInput(e, noSpaces, set) {
    const item = e.target;
    if (item.rows) {
      if (item.value.replace(/\r\n/g, "\n").split("\n").length > item.rows) {
        return;
      }
    }
    if (noSpaces) set(item.value.replace(/^\s*|\s*$/g, ""));
    else set(item.value);
  }

  function onAddBlock() {
    const media = {
      video: mediaType === "video" ? loadedImage : "",
      image: mediaType === "photo" ? loadedImage : "",
    };
    addBlock({
      type: chosenBlock,
      text,
      link,
      ...media,
    });
  }

  async function loadCanvasMedia(media) {
    console.log("loading");
    setMediaLoading(true);
    const itemImage = Math.random() * Math.floor(Math.random() * Date.now());
    if (media == null) return;
    await storage.ref(`/${itemImage}`).put(media);
    await storage
      .ref(`/${itemImage}`)
      .getDownloadURL()
      .then((url) => {
        setLoadedImage(url);
        setMediaLoading(false);
      });
  }

  return (
    <button onClick={onDismiss} className="modal-container">
      <button onClick={(e) => e.stopPropagation()} className="modal">
        <div className="flex">
          {blockProps.textEditable && (
            <div className="canvas-blocks-picker-el-container">
              <p className="canvas-blocks-picker-el-title">Текст</p>
              <div className="canvas-blocks-picker-el">
                <textarea
                  placeholder="Здесь вы можете написать абсолютно любой текст"
                  rows="1"
                  multiple
                  onChange={(e) => changeInput(e, false, setText)}
                  className="canvas-blocks-picker-el-input"
                  value={text}
                ></textarea>
              </div>
            </div>
          )}
          {blockProps.link && (
            <div className="canvas-blocks-picker-el-container">
              <p className="canvas-blocks-picker-el-title">Ссылка</p>
              <div className="canvas-blocks-picker-el">
                <textarea
                  placeholder="Здесь вы можете прикрепить ссылку"
                  rows="1"
                  multiple
                  onChange={(e) => changeInput(e, true, setLink)}
                  className="canvas-blocks-picker-el-input"
                  value={link}
                ></textarea>
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          {blockProps.video && (
            <div className="canvas-blocks-picker-el-container">
              <p className="canvas-blocks-picker-el-title">Видео</p>
              <div className="canvas-blocks-picker-el">
                <input
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  name="video"
                  id="video"
                  className="file-input-hidden"
                  onChange={(e) => {
                    console.log("asdasd");
                    setMediaType("video");
                    loadCanvasMedia(e.target.files[0]);
                  }}
                />
                <label htmlFor="video">
                  <div className="opacity-hover-btn">
                    {!!loadedImage && mediaType === "video" ? (
                      <video width="320" height="240" controls>
                        <source src={loadedImage} type="video/mp4" />
                        <source src={loadedImage} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={videoPlaceholder}
                        className="canvas-blocks-picker-el-addmedia video"
                      />
                    )}

                    {!mediaLoading ? (
                      <div className="cross">
                        <div className="cross-vertical"></div>
                        <div className="cross-horizontal"></div>
                      </div>
                    ) : (
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
            </div>
          )}
          {blockProps.photo && (
            <div className="canvas-blocks-picker-el-container">
              <p className="canvas-blocks-picker-el-title">Фото</p>
              <div className="canvas-blocks-picker-el">
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/png, image/jpeg"
                  className="file-input-hidden"
                  onChange={(e) => {
                    console.log("asdasd");
                    loadCanvasMedia(e.target.files[0]);

                    setMediaType("photo");
                  }}
                />
                <label htmlFor="photo">
                  <div className="opacity-hover-btn">
                    <img
                      src={
                        mediaType === "photo"
                          ? loadedImage || photoPlaceholder
                          : photoPlaceholder
                      }
                      className="canvas-blocks-picker-el-addmedia photo"
                    />

                    {!mediaLoading ? (
                      <div className="cross">
                        <div className="cross-vertical"></div>
                        <div className="cross-horizontal"></div>
                      </div>
                    ) : (
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
            </div>
          )}
        </div>
        <button
          disabled={mediaLoading}
          className="save-btn"
          onClick={onAddBlock}
        >
          Принять
        </button>
      </button>
    </button>
  );
}
