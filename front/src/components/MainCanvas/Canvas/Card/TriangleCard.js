import React, { useEffect } from "react";
import placeholderImage from "../../../../assets/gray-square.png";
import { useDrag } from "react-dnd";
import { getStyles } from "../../../../common/cardFunctions";
import CardContainer from "./CardContainer";

const TriangleCard = ({
  redact,
  id,
  type,
  text,
  left,
  top,
  image,
  video,
  link,
  scale,
  rotation,
}) => {
  return (
    <div
      className="mask triangle-mask"
      style={{ transform: `rotate(${rotation}deg) scale(${scale / 100})` }}
    >
      <div>
        {console.log(image)}

        {video ? (
          <video
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            autoPlay={true}
            muted
            loop
          >
            <source src={video} type="video/mp4" />
            <source src={video} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={image || placeholderImage} alt="test"></img>
        )}

        {video ? (
          <video
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            autoPlay={true}
            muted
            loop
          >
            <source src={video} type="video/mp4" />
            <source src={video} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={image || placeholderImage} alt="test"></img>
        )}

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
