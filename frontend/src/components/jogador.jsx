import "./styles/stylenotas.css";
import React from "react";
// const jogadores = [
//   { nome: "Cristiano Gornaldo", foto: "/frontend/src/assets/image 3.svg" },
//   { nome: "Sósia do Neymar", foto: "/frontend/src/assets/image 5.svg" },
//   { nome: "Cano Sacudo", foto: "/frontend/src/assets/Ellipse 1.svg" },
// ];
function Jogador(id, nome, foto) {
  //fetch para pegar nomes?
  return (
    <div>
      <div class="jogadores-time1">
        <div class="info-j">
          <img src={foto} />
          <h2>{nome}</h2>
        </div>
        <div class="info-n">
          <h2>Dê sua nota</h2>
          <h2>--/10</h2>
        </div>
      </div>
    </div>
  );
}
export default Jogador;
