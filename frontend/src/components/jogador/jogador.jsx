import "./stylenotas.css";
import React from "react";
import Delete from "../../assets/delete.svg";
import Promote from "../../assets/star.svg";

function Jogador({ id, nome }) {
  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <h1>{nome}</h1>
        <img src={Delete} alt="menu" className="imagedelete" />
        <img src={Promote} alt="menu" className="imagepromote" />
      </div>
    </div>
  );
}
export default Jogador;
