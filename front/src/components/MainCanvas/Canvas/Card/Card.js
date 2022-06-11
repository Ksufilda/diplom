import React, { useEffect, useState } from "react";
import "./Card.css";
import SquareCard from "./SquareCard";
import TextCard from "./TextCard";
import PolygonCard from "./PolygonCard";
import TriangleCard from "./TriangleCard";
import RectangleCard from "./RectangleCard";
import { getStyles } from "../../../../common/cardFunctions";
import { useDrag } from "react-dnd";
import CardContainer from "./CardContainer";

const Card = (props) => {
  const {
    redact,
    id,
    type,
    link,
    text,
    left,
    top,
    image,
    enableRedactMenu,
    enabledKey,
    rotation,
    scale,
  } = props;

  console.log(rotation, !isNaN(scale) ? scale : 100);

  const [scaleState, setScaleState] = useState(!isNaN(scale) ? scale : 100);
  const [rotationState, setRotationState] = useState(
    !isNaN(rotation) ? rotation : 0
  );

  const cardTypes = {
    polygon: {
      jsx: (
        <PolygonCard
          {...props}
          scale={scaleState}
          rotation={rotationState}
        ></PolygonCard>
      ),
    },
    rectangle: {
      jsx: (
        <RectangleCard
          {...props}
          scale={scaleState}
          rotation={rotationState}
        ></RectangleCard>
      ),
    },
    square: {
      jsx: (
        <SquareCard
          {...props}
          scale={scaleState}
          rotation={rotationState}
        ></SquareCard>
      ),
    },
    text: {
      jsx: (
        <TextCard
          {...props}
          scale={scaleState}
          rotation={rotationState}
        ></TextCard>
      ),
    },
    triangle: {
      jsx: (
        <TriangleCard
          {...props}
          scale={scaleState}
          rotation={rotationState}
        ></TriangleCard>
      ),
    },
  };

  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type,
      item: { id, left, top, scale: scaleState, rotation: rotationState, text },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, scaleState, rotationState, text]
  );

  useEffect(() => {
    preview(null, { captureDraggingState: true });
  }, []);

  return (
    <>
      <div ref={redact ? dragRef : null}>
        <CardContainer
          href={link}
          ref={redact ? dragRef : null}
          style={getStyles(left, top, isDragging)}
          role="DraggableBox"
        >
          <div className={"card-redact-container"}>
            {id === enabledKey && (
              <div className="card-redact-menu">
                <div className="card-redact-menu-block">
                  <input
                    type="range"
                    id="scale"
                    name="scale"
                    min="0"
                    max="300"
                    onChange={(e) => setScaleState(e.target.value)}
                    value={scaleState}
                  />
                  <label style={{ marginLeft: 5, color: "#000" }} for="scale">
                    scale
                  </label>
                </div>
                <div className="card-redact-menu-block">
                  <input
                    type="range"
                    id="rotation"
                    name="rotation"
                    min="0"
                    max="360"
                    onChange={(e) => setRotationState(e.target.value)}
                    value={rotationState}
                  />
                  <label
                    style={{ marginLeft: 5, color: "#000" }}
                    for="rotation"
                  >
                    rotation
                  </label>
                </div>
              </div>
            )}
            {redact && (
              <button
                className="canvas-blocks-button small-square-btn"
                onClick={() => enableRedactMenu(id)}
              >
                <img src={require("../../../../assets/editSimple.png")}></img>
              </button>
            )}
            <div>{cardTypes[props.type].jsx}</div>
          </div>
        </CardContainer>
      </div>
    </>
  );
};

export default Card;
