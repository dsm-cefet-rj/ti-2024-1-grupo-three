import React from "react";
import Jogador from "../components/jogador";

const jogadores = [
  { nome: "Cristiano Gornaldo", foto: "/frontend/src/assets/image 3.svg" },
  { nome: "Sósia do Neymar", foto: "/frontend/src/assets/image 5.svg" },
  { nome: "Cano Sacudo", foto: "/frontend/src/assets/Ellipse 1.svg" },
];

const Partida = (id) => {
  return (
    <div className="">
      <div>
        {time1.nome};
        <div>
          {jogadores.map((jogador, i) => (
            <Jogador nome={jogador.nome} id={jogador.id} />
          ))}
        </div>
      </div>
      <div>
        {time2.nome};
        <div>
          {jogadores.map((jogador, i) => (
            <Jogador nome={jogador.nome} id={jogador.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partida;

//envolver na hora de puxar o componente
// {jogadores.length > 0 ? (
//      ) : (
//   <div>Sem jogadores na equipe</div>
// )}

// {/* <div>
// {jogadores.map((jogador, i) => (          ))}
//    </div> */}
