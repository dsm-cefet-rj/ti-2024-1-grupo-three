import { React, useState } from "react";
import Jogador from "../../components/jogador/jogador";
import Button from "../../components/button/button";
import "../partida/partida.css";
import NavBar from "../../components/navBar/navBar";

const Partida = ({ id }) => {
  const jogadores = [
    { id: "1", nome: "Cristiano Gornaldo" },
    { id: "2", nome: "Sósia do Neymar" },
    { id: "3", nome: "Cano Sacudo" },
  ];

  const jogadoresNota = [
    { id: "1", nome: "Cristiano Gornaldo", nota: "5.4", votos: "10" },
    { id: "2", nome: "Sósia do Neymar", nota: "7.4", votos: "12" },
    { id: "3", nome: "Cano Sacudo", nota: "10", votos: "2" },
  ];

  const time1 = "jogadores do vasco";
  const time2 = "jogadores do fluminense";
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div>
      <NavBar />
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
