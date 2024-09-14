import "./stylenotas.css";
import React from "react";
import Delete from "../../assets/delete.svg";

function Jogador({ id, nome }) {
  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <h1>{nome}</h1>
        <img src={Delete} alt="menu" className="imagedelete" />
      </div>
    </div>
  );
}
export default Jogador;
