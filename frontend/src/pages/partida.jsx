import { React, useState } from "react";
import Jogador from "../components/jogador/jogador";
import Button from "../components/button/button";

const Partida = ({ id }) => {
  const jogadores = [
    { id: "1", nome: "Cristiano Gornaldo" },
    { id: "2", nome: "Sósia do Neymar" },
    { id: "3", nome: "Cano Sacudo" },
  ];
  const time1 = "Vasco";
  const time2 = "Flu";
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div className="">
      <div>
        <h1>{time1}</h1>
        {show ? (
          <div>
            <div>
              {jogadores.map((jogador, i) => (
                <Jogador nome={jogador.nome} id={jogador.id} />
              ))}
            </div>
            <div>
              <Button show={show} setShow={setShow} />
            </div>
          </div>
        ) : (
          <div>
            <div>
              {jogadores.slice(0, 2).map((jogador, i) => (
                <Jogador nome={jogador.nome} id={jogador.id} />
              ))}
            </div>
            <div>
              <Button show={show} setShow={setShow} />
            </div>
          </div>
        )}
      </div>
      <div>
        <h1>{time2}</h1>
        {show2 ? (
          <div>
            <div>
              {jogadores.map((jogador, i) => (
                <Jogador nome={jogador.nome} id={jogador.id} />
              ))}
            </div>
            <div>
              <Button show={show2} setShow={setShow2} />
            </div>
          </div>
        ) : (
          <div>
            <div>
              {jogadores.slice(0, 2).map((jogador, i) => (
                <Jogador nome={jogador.nome} id={jogador.id} />
              ))}
            </div>
            <div>
              <Button show={show2} setShow={setShow2} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Partida;
