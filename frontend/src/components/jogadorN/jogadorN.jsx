import React from "react";
import "../jogador/stylenotas.css";

function JogadorN({ id, nome, nota, votos }) {
  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <div className="info-j">
          <h2>{nome}</h2>
        </div>
        <div className="info-n">
          <div className="nota1">
            <h2>{nota}/10</h2>
            <h2> {votos} votos</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JogadorN;
