import React, { useEffect } from "react";
import placeholderImage from "../../../../assets/gray-square.png";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";
import CardContainer from "./CardContainer";

const RectangleCard = ({ redact, id, type, link, text, left, top, image }) => {
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
        ref={redact ? dragRef : null}
        style={getStyles(left, top, isDragging)}
        role="DraggableBox"
      >
        <div className="mask rectangle-mask">
          <div>
            <img src={image || placeholderImage} alt="test"></img>

            {text && (
              <div className="mask-text">
                <p>{text}</p>
              </div>
            )}
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default RectangleCard;
