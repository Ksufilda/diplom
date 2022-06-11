import React, { useEffect } from "react";
import placeholderImage from "../../../../assets/gray-square.png";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";
import CardContainer from "./CardContainer";

const RectangleCard = ({
  redact,
  id,
  type,
  link,
  text,
  left,
  top,
  image,
  rotation,
  scale,
}) => {
  return (
    <div
      className="mask rectangle-mask"
      style={{ transform: `rotate(${rotation}deg) scale(${scale / 100})` }}
    >
      <div>
        <img src={image || placeholderImage} alt="test"></img>

        {text && (
          <div className="mask-text">
            <p>{text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RectangleCard;
