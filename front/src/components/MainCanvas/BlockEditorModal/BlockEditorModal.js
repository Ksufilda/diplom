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
  const [video, setVideo] = useState("");

  const [imageLoading, setImageLoading] = useState(false);
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
    addBlock({
      type: chosenBlock,
      text,
      link,
      image: loadedImage,
      video,
    });
  }

  async function loadCanvasImage(image) {
    console.log("loading");
    setImageLoading(true);
    const itemImage = Math.random() * Math.floor(Math.random() * Date.now());
    if (image == null) return;
    await storage.ref(`/${itemImage}`).put(image);
    await storage
      .ref(`/${itemImage}`)
      .getDownloadURL()
      .then((url) => {
        setLoadedImage(url);
        setImageLoading(false);
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
                <button className="opacity-hover-btn disabled">
                  <img
                    src={videoPlaceholder}
                    className="canvas-blocks-picker-el-addmedia photo"
                  />

                  <div className="cross">
                    <div className="cross-vertical"></div>
                    <div className="cross-horizontal"></div>
                  </div>
                </button>
              </div>
            </div>
          )}
          {blockProps.photo && (
            <div className="canvas-blocks-picker-el-container">
              <p className="canvas-blocks-picker-el-title">Фото</p>
              <div className="canvas-blocks-picker-el">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="file-input-hidden"
                  onChange={(e) => {
                    console.log("asdasd");
                    loadCanvasImage(e.target.files[0]);
                  }}
                />
                <label htmlFor="file">
                  <div className="opacity-hover-btn">
                    <img
                      src={loadedImage || photoPlaceholder}
                      className="canvas-blocks-picker-el-addmedia photo"
                    />

                    {!imageLoading ? (
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
        <button className="save-btn" onClick={onAddBlock}>
          Принять
        </button>
      </button>
    </button>
  );
}
