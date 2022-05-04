import React, { useEffect } from "react";
import ksuna from "../../../../assets/ksunaImage.png";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";

const TextCard = ({ id, type, text, left, top }) => {
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
      {text}
    </div>
  );
};

export default TextCard;
