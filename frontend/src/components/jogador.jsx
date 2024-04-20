import './stylenotas.css';
import React from "react";

function Jogador(id, nome) {
  //fetch para pegar nomes?
  return (
    <div>
      <div class="jogadores-time1">
        <div class="info-j">
        <img src="/frontend/src/assets/image 5.svg" />
          <h2>{nome}</h2>
        </div>
        <div class="info-n">
          <div class="nota1">
          <h2>Dê sua nota</h2>
          <h2> <input class="nota" type="text" placeholder="--"></input>/10</h2>
        </div>
        </div>
      </div>
    </div>
  );
}
export default Jogador;
