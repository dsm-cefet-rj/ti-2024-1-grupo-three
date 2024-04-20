import React from "react";
import Jogador from "../components/jogador";
import Button from "../components/button";
import { useState } from "react";

const jogadores = [
  { id: "1", nome: "Cristiano Gornaldo"  },
  { id: "2",nome: "Sósia do Neymar"  },
  { id: "3",nome: "Cano Sacudo" }
];  

const time1 = "Vasco"
const time2 = "Flu"

const [show, setShow] = useState(false);

const Partida = (id) => {
  return (
    <div className="">
      <div>
        {time1};
        {show ? (
        <div>
        {jogadores.slice(0,2).map((jogador, i) => (
          <Jogador nome={jogador.nome} id={jogador.id} />
        ))}
              <div>
                <Button show={show}/>
              </div>
      </div>
        ): (
          <div>
          {jogadores.map((jogador, i) => (
            <Jogador nome={jogador.nome} id={jogador.id} />
          ))}
        </div>
        )}  

      </div>
      <div>
        {time2};
        {show ? (
        <div>
        {jogadores.slice(0,2).map((jogador, i) => (
          <Jogador nome={jogador.nome} id={jogador.id} />
        ))}
              <div>
                <Button show={show}/>
              </div>
      </div>
        ): (
          <div>
          {jogadores.map((jogador, i) => (
            <Jogador nome={jogador.nome} id={jogador.id} />
          ))}
        </div>
        )} 
      </div>
    </div>
  );
};

export default Partida;