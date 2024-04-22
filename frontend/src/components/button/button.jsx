import React from "react";
import "./button.css";

export default function Button({ show, setShow }) {
  return (
    <div className="botao">
      <button className="vermais" onClick={() => setShow(!show)}>
        ver {show ? "menos" : "mais"}
      </button>
    </div>
  );
}
