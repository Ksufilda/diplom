import React, { useEffect } from "react";
import placeholderImage from "../../../../assets/gray-square.png";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";
import CardContainer from "./CardContainer";

const PolygonCard = ({
  redact,
  rotation,
  scale,
  id,
  type,
  text,
  link,
  left,
  top,
  image,
}) => {
  return (
    <div
      className="mask polygon-mask"
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

export default PolygonCard;
