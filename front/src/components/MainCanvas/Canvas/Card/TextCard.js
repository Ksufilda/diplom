import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";
import CardContainer from "./CardContainer";

const TextCard = ({ redact, id, type, link, text, left, top }) => {
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
    <div ref={redact ? dragRef : null}>
      <CardContainer
        href={link}
        style={getStyles(left, top, isDragging)}
        role="DraggableBox"
      >
        {text}
      </CardContainer>
    </div>
  );
};

export default TextCard;
