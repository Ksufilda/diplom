import React, { useEffect, useState } from "react";
import "./MainCanvas.css";
import edit from "../../assets/edit.png";

import BlockPicker from "./BlockPicker";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Canvas } from "./Canvas/Canvas";
import { deleteCanvas, getCanvas, postCanvas } from "../../api/queries";
import Garbage from "./Garbage";
import { ItemTypes } from "./itemTypes";

const MainCanvas = () => {
  const [pickerActive, setPickerActive] = useState(false);
  const [boxes, setBoxes] = useState({});

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

  useEffect(() => {
    getCanvas(1).then((res) => {
      setBoxes(
        res.rows.reduce(function (results, row) {
          results[row.id] = {
            top: Number(row.y),
            left: Number(row.x),
            title: "Drag me around",
            type: row.type,
            image: row.image,
            link: row.link,
            text: row.text,
          };
          return results;
        }, {})
      );
      // setBoxes(
      //   res.rows.reduce(function (results, row) {
      //     (results[row.id] = results[row.id] || []).push(row);
      //     return results;
      //   }, {})
      // );
    });
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

    postCanvas({
      id: randomId,
      userId: 1,
      y: 0,
      x: 0,
      title: "Drag me around",
      type: data.type,
      image: data.image,
      link: data.link,
      text: data.text,
      video: "",
    }).then((res) => {
      console.log(res);
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
      <Garbage drop={garbageBin}></Garbage>

      <BlockPicker onAdd={addBlock} active={pickerActive} />

      <Canvas isOverDelete={isOver} setBoxes={setBoxes} boxes={boxes}></Canvas>
    </div>
  );
};

export default MainCanvas;
