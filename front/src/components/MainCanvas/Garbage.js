import React from "react";
import garbage from "../../assets/garbage.png";
import { ItemTypes } from "./itemTypes";
import "./MainCanvas.css";
import { useDrop } from "react-dnd";

export default function Garbage({ drop }) {
  return (
    <div ref={drop} className={`canvas-blocks-delete`}>
      <img
        className="canvas-blocks-button-img"
        alt="garbage"
        src={garbage}
      ></img>
    </div>
  );
}
