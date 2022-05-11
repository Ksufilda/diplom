import React from "react";

export default function CardContainer(props) {
  const Block = props.href ? "a" : "div";
  return <Block {...props}></Block>;
}
