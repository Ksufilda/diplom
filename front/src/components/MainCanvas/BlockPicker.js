import React from "react";
import "./MainCanvas.css";
import triangleBlock from "../../assets/triangleBlock.png";

const BlockPicker = ({ active, onAdd }) => {
  function addBlock(type) {
    onAdd(type);
  }

  return (
    <div className={`canvas-blocks-picker${active ? " active" : ""}`}>
      <button
        className="canvas-blocks-picker-el-container"
        onClick={() => addBlock("triangle")}
      >
        <div className="canvas-blocks-picker-el">
          <img
            className="canvas-blocks-picker-el-img"
            src={triangleBlock}
            alt="triangle"
          ></img>
        </div>
      </button>
      <button className="canvas-blocks-picker-el-container">
        <div className="canvas-blocks-picker-el">
          <img
            className="canvas-blocks-picker-el-img"
            src={triangleBlock}
            alt="triangle"
          ></img>
        </div>
      </button>
      <button className="canvas-blocks-picker-el-container">
        <div className="canvas-blocks-picker-el">
          <img
            className="canvas-blocks-picker-el-img"
            src={triangleBlock}
            alt="triangle"
          ></img>
        </div>
      </button>
    </div>
  );
};

export default BlockPicker;
