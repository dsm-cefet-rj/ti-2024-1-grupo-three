import "./stylenotas.css";
import React from "react";

function Time({ id, nome }) {
  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <div className="info-j">
          <h2>{nome}</h2>
        </div>
      </div>
    </div>
  );
}
export default Time;