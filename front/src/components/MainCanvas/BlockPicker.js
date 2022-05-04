import React, { useState } from "react";
import "./MainCanvas.css";
import triangleBlock from "../../assets/triangleBlock.png";
import square from "../../assets/square.png";
import rectangle from "../../assets/rectangle.png";
import polygon from "../../assets/polygon.png";
import BlockEditorModal from "./BlockEditorModal/BlockEditorModal";

const BlockPicker = ({ active, onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [chosenBlock, setChosenBlock] = useState();

  function chooseBlock(type) {
    setChosenBlock(type);
    setVisible(true);
  }

  function addBlock(data) {
    setVisible(false);
    onAdd(data);
  }

  function onDismiss() {
    setVisible(false);
  }

  return (
    <>
      {visible && (
        <BlockEditorModal
          chosenBlock={chosenBlock}
          visible={visible}
          onDismiss={onDismiss}
          addBlock={addBlock}
          blockProps={{
            textEditable: true,
            link: true,
            photo: true,
            video: true,
          }}
        />
      )}
      <div className={`canvas-blocks-picker${active ? " active" : ""}`}>
        <button
          className="canvas-blocks-picker-el-container hover"
          onClick={() => chooseBlock("triangle")}
        >
          <div className="canvas-blocks-picker-el">
            <img
              className="canvas-blocks-picker-el-img"
              src={triangleBlock}
              alt="triangle"
            ></img>
          </div>
        </button>
        <button
          onClick={() => chooseBlock("polygon")}
          className="canvas-blocks-picker-el-container hover"
        >
          <div className="canvas-blocks-picker-el">
            <img
              className="canvas-blocks-picker-el-img"
              src={polygon}
              alt="polygon"
            ></img>
          </div>
        </button>
        <button
          onClick={() => chooseBlock("rectangle")}
          className="canvas-blocks-picker-el-container hover"
        >
          <div className="canvas-blocks-picker-el">
            <img
              className="canvas-blocks-picker-el-img"
              src={rectangle}
              alt="rectangle"
            ></img>
          </div>
        </button>
        <button
          onClick={() => chooseBlock("square")}
          className="canvas-blocks-picker-el-container hover"
        >
          <div className="canvas-blocks-picker-el">
            <img
              className="canvas-blocks-picker-el-img"
              src={square}
              alt="square"
            ></img>
          </div>
        </button>
      </div>
    </>
  );
};

export default BlockPicker;
