import React from "react";
import ksuna from "../../../../assets/ksunaImage.png";
import { useDrag } from "react-dnd";

const TriangleCard = ({ type, text }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );
  return (
    <div
      ref={dragRef}
      style={{
        backgroundColor: "transparent",
        opacity: isDragging ? 1 : 1,
      }}
    >
      <div className="mask">
        <img src={ksuna} alt="test"></img>
        {text}
      </div>
    </div>
  );
};

export default TriangleCard;
