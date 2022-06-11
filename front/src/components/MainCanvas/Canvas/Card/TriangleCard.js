import React, { useEffect } from "react";
import placeholderImage from "../../../../assets/gray-square.png";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";
import CardContainer from "./CardContainer";

const TriangleCard = ({ redact, id, type, text, left, top, image, link }) => {
  return (
    <div className="mask triangle-mask">
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

export default TriangleCard;
