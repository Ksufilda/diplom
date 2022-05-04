import React, { useEffect, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card/Card";
import "../MainCanvas.css";
import update from "immutability-helper";
import { ItemTypes } from "../itemTypes";

export const Canvas = ({ boxes, setBoxes }) => {
  useEffect(() => {
    console.log(boxes, "updated");
  }, [boxes]);

  const [{ isOver, canDrop }, drop] = useDrop(() => {
    return {
      accept: ItemTypes,
      drop: (item, monitor) => moveBlock(item, monitor),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    };
  }, [boxes]);

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  function moveBlock(item, monitor) {
    const delta = monitor.getDifferenceFromInitialOffset();

    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);

    moveBox(item.id, left, top);
  }

  const moveBox = useCallback(
    (id, left, top) => {
      console.log(boxes);
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes]
  );

  return (
    <div ref={drop} className="canvas" style={{ backgroundColor }}>
      {Object.keys(boxes).map((key) => {
        return <Card id={key} {...boxes[key]} type={boxes[key].type}></Card>;
      })}
    </div>
  );
};
