import { React, useState } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import JogadorN from "../../components/jogadorN/jogadorN";
import "../partida/partida.css";

const Time = ({ id }) => {

  const jogadoresNota = [
    { id: "1", nome: "Cristiano Gornaldo", nota: "5.4", votos: "10" },
    { id: "2", nome: "Sósia do Neymar", nota: "7.4", votos: "12" },
    { id: "3", nome: "Cano Sacudo", nota: "10", votos: "2" },
  ];

  const time = "jogadores do fluminense";
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div>
        <NavBar/>
        <div>
            <h1>{time}</h1>
            <div>
                <h1>Jogadores</h1>
                {show ? (
                <div>
                    <div>
                        {jogadoresNota.map((jogadorN, i) => (
                            <JogadorN
                            key={jogadorN.id}
                            nome={jogadorN.nome}
                            id={jogadorN.id}
                            nota={jogadorN.nota}
                            votos={jogadorN.votos}
                            />
                        ))}
                    </div>
                    <div>
                        <Button show={show} setShow={setShow} />
                    </div>
                </div>
                ) : (
                <div>
                    <div>
                        {jogadoresNota.slice(0, 2).map((jogadorN, i) => (
                            <JogadorN
                            key={jogadorN.id}
                            nome={jogadorN.nome}
                            id={jogadorN.id}
                            nota={jogadorN.nota}
                            votos={jogadorN.votos}
                            />
                        ))}
                    </div>
                    <div>
                        <Button show={show} setShow={setShow} />
                    </div>
                </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default Time;