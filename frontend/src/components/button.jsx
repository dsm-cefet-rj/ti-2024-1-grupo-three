import React from "react";
import './stylenotas.css';


export default function Button(show) {
 
  return (
    <div className="ver">
      <button onClick={() => setShow(!show)}>
        Ver {show ? "mais" : "menos"}
      </button>
    </div>
  );
}



