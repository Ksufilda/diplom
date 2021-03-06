import React, { useEffect, useState } from "react";
import "./MainCanvas.css";
import edit from "../../assets/edit.png";

import BlockPicker from "./BlockPicker";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Canvas } from "./Canvas/Canvas";
import { deleteCanvas, getMyCanvas, postCanvas } from "../../api/queries";
import Garbage from "./Garbage";
import { ItemTypes } from "./itemTypes";
import { getCookie } from "../../common/getCookie";

const MainCanvas = ({ redact, userId, boxes, setBoxes }) => {
  const [pickerActive, setPickerActive] = useState(false);

  const [{ isOver }, garbageBin] = useDrop(() => {
    return {
      accept: ItemTypes,
      drop: (item) => deleteBlock(item),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    };
  }, [boxes]);

  function deleteBlock(item) {
    const a = boxes;

    delete a[item.id];
    setBoxes(a);

    deleteCanvas(item.id);
  }

  function addBlock(data) {
    const randomId = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );

    setBoxes({
      ...boxes,
      [randomId]: {
        top: 0,
        left: 0,
        title: "Drag me around",
        type: data.type,
        image: data.image || "",
        link: data.link,
        text: data.text,
        rotation: 0,
        scale: 100,
        video: data.video || "",
      },
    });
    postCanvas({
      id: randomId,
      userId: userId,
      y: 0,
      x: 0,
      rotation: 0,
      scale: 100,
      title: "Drag me around",
      type: data.type,
      image: data.image || "",
      link: data.link,
      text: data.text,
      video: data.video || "",
    });
  }

  return (
    <div className="canvas-container">
      {redact && (
        <>
          <button
            onClick={() => {
              setPickerActive(!pickerActive);
            }}
            className={`canvas-blocks-button ${pickerActive ? " active" : " "}`}
          >
            <img
              className="canvas-blocks-button-img"
              alt="edit-btn"
              src={edit}
            ></img>
          </button>
          <Garbage drop={garbageBin}></Garbage>

          <BlockPicker onAdd={addBlock} active={pickerActive} />
        </>
      )}

      <Canvas
        userId={userId}
        redact={redact}
        isOverDelete={isOver}
        setBoxes={setBoxes}
        boxes={boxes}
      ></Canvas>
    </div>
  );
};

export default MainCanvas;
