import React, { useEffect } from "react";
import ksuna from "../../../../assets/ksunaImage.png";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";

const SquareCard = ({ id, type, text, left, top, image }) => {
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type,
      item: { id, left, top, text },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, text]
  );

  useEffect(() => {
    preview(null, { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={dragRef}
      style={getStyles(left, top, isDragging)}
      role="DraggableBox"
    >
      <div className="mask square-mask">
        <img src={image || ksuna} alt="test"></img>
        {text}
      </div>
    </div>
  );
};

export default SquareCard;
