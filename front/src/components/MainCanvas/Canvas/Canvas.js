import React, { useEffect, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card/Card";
import "../MainCanvas.css";
import update from "immutability-helper";
import { ItemTypes } from "../itemTypes";
import { postCanvas } from "../../../api/queries";

export const Canvas = ({ redact, isOverDelete, boxes, setBoxes }) => {
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
  if (isOverDelete) backgroundColor = "red";
  else if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  function moveBlock(item, monitor) {
    const delta = monitor.getDifferenceFromInitialOffset();

    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);

    moveBox(item.id, left, top);
    postCanvas({
      id: item.id,
      userId: 1,
      y: top,
      x: left,
      type: boxes[item.id].type,
      image: boxes[item.id].image,
      link: boxes[item.id].link,
      text: boxes[item.id].text,
      video: "",
    });
  }

  const moveBox = useCallback(
    (id, left, top) => {
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
    <div
      ref={redact ? drop : null}
      className="canvas"
      style={{ backgroundColor }}
    >
      {Object.keys(boxes).map((key) => {
        return (
          <Card
            redact={redact}
            id={key}
            {...boxes[key]}
            type={boxes[key].type}
          ></Card>
        );
      })}
    </div>
  );
};
