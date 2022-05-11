import React from "react";
import "./header.css";

export default function Header({ saveProfile }) {
  return (
    <div>
      <button
        onClick={() => {
          saveProfile();
        }}
      >
        Сохранить страничку
      </button>
      <button className="round-btn"></button>
    </div>
  );
}
