import React, { useEffect } from "react";
import ksuna from "../../../../assets/ksunaImage.png";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";
import CardContainer from "./CardContainer";

const PolygonCard = ({ redact, id, type, text, link, left, top, image }) => {
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
        <div className="mask polygon-mask">
          <div className="mask-text">
            <p>{text}</p>
          </div>
          <img src={image || ksuna} alt="test"></img>
        </div>
      </CardContainer>
    </div>
  );
};

export default PolygonCard;
