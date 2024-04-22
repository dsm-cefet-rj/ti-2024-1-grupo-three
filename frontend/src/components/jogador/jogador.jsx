import "../jogador/stylenotas.css";
import React from "react";

function Jogador({ id, nome }) {
  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <div className="info-j">
          <h2>{nome}</h2>
        </div>
        <div className="info-n">
          <div className="nota1">
            <h2>Dê sua nota</h2>
            <h2>
              <input className="nota" type="text" placeholder="--"></input>/10
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Jogador;
