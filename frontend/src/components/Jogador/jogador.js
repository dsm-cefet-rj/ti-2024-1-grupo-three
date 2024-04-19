import "./styles/stylenotas.css";
import React from 'react';
const jogadores = [
  { nome: 'Cristiano Gornaldo', foto: '/frontend/src/assets/image 3.svg'},
  { nome: 'Sósia do Neymar', foto: '/frontend/src/assets/image 5.svg'},
  { nome: 'Cano Sacudo', foto: '/frontend/src/assets/Ellipse 1.svg'}
];
function jogador (){
   //fetch para pegar nomes?

    return(
      <div>
      {jogadores.length > 0 ? (
        <div>
        {jogadores.map((jogador) => (
        <div class="jogadores-time1">
        <div class="info-j">
          {jogadores.length}
          //quero botar a jogador.foto aqui
          <img src="/frontend/src/assets/image 3.svg" />
          <h2 key={jogador.nome}> 
            {jogador.nome}
          </h2> 
        </div>
        <div class="info-n">
          <h2>Dê sua nota</h2>
          <h2>--/10</h2>
        </div>
        </div>
    ))}
    </div>): (
      <div>Sem jogadores na equipe</div>
    )}
    </div>)}
export default jogador;