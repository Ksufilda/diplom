import React, { useEffect, useState } from "react";
import "./MainCanvas.css";
import edit from "../../assets/edit.png";
import BlockPicker from "./BlockPicker";
import Card from "./Canvas/Card/Card";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Canvas } from "./Canvas/Canvas";

const MainCanvas = () => {
  const [pickerActive, setPickerActive] = useState(false);
  const [cards, setCards] = useState([]);

  function addBlock(type) {}

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

      {cards.map((item) => {
        return <Card type={item.type}></Card>;
      })}

      <DndProvider backend={HTML5Backend}>
        <Canvas></Canvas>
      </DndProvider>
    </div>
  );
};

export default MainCanvas;
