import React from "react";
import "./Card.css";

import TriangleCard from "./TriangleCard";

const Card = ({ type, text }) => {
  const cardTypes = {
    triangle: {
      jsx: <TriangleCard type={type} text={text}></TriangleCard>,
    },
  };
  return <TriangleCard type={type} text={text}></TriangleCard>;
};

export default Card;
