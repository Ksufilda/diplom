import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";
import CardContainer from "./CardContainer";

const TextCard = ({
  redact,
  id,
  type,
  link,
  text,
  left,
  top,
  rotation,
  scale,
}) => {
  return (
    <div style={{ transform: `rotate(${rotation}deg) scale(${scale / 100})` }}>
      {text}
    </div>
  );
};

export default TextCard;
