import React, { useEffect, useState } from "react";
import "./MainCanvas.css";
import edit from "../../assets/edit.png";
import BlockPicker from "./BlockPicker";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Canvas } from "./Canvas/Canvas";
import { getCanvas } from "../../api/queries";

const MainCanvas = () => {
  const [pickerActive, setPickerActive] = useState(false);
  const [boxes, setBoxes] = useState({});

  useEffect(() => {
    getCanvas(1).then((res) => console.log(res));
  }, []);

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
        image: data.image,
        link: data.link,
        text: data.text,
      },
    });
  }

  return (
    <div className="canvas-container">
      <button
        onClick={() => {
          console.log(pickerActive);
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

      <BlockPicker onAdd={addBlock} active={pickerActive} />

      <DndProvider backend={HTML5Backend}>
        <Canvas setBoxes={setBoxes} boxes={boxes}></Canvas>
      </DndProvider>
    </div>
  );
};

export default MainCanvas;
