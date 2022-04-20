import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card/Card";
import "../MainCanvas.css";

export const Canvas = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMousemove = (event) => {
    setX(event.x);
    setY(event.y);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMousemove);

    return () => {
      document.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: "triangle",
      drop: () => moveBlock(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    };
  }, [x, y]);

  function moveBlock(x, y) {
    console.log(x, y);
  }

  return (
    <div ref={drop} className="canvas">
      <Card type={"triangle"}></Card>
    </div>
  );
};
