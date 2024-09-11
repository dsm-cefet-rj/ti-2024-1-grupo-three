import "./stylenotas.css";
import React from "react";

function Jogador({ id, nome }) {
  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <h1>{nome}</h1>
      </div>
    </div>
  );
}
export default Jogador;
