import React from "react";
import "./Card.css";
import SquareCard from "./SquareCard";
import TextCard from "./TextCard";
import PolygonCard from "./PolygonCard";
import TriangleCard from "./TriangleCard";
import RectangleCard from "./RectangleCard";

const Card = (props) => {
  console.log(props);
  const cardTypes = {
    polygon: {
      jsx: <PolygonCard {...props}></PolygonCard>,
    },
    rectangle: {
      jsx: <RectangleCard {...props}></RectangleCard>,
    },
    square: {
      jsx: <SquareCard {...props}></SquareCard>,
    },
    text: {
      jsx: <TextCard {...props}></TextCard>,
    },
    triangle: {
      jsx: <TriangleCard {...props}></TriangleCard>,
    },
  };
  return <>{cardTypes[props.type].jsx}</>;
};

export default Card;
