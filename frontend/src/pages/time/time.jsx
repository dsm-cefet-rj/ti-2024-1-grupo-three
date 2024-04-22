import { React, useState } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import JogadorN from "../../components/jogadorN/jogadorN";
import PartidaComponente from "../../components/partidaComponent/partidaComponente";
import "./time.css";

const Time = ({ id }) => {

  const jogadoresNota = [
    { id: "1", nome: "Cristiano Gornaldo", nota: "5.4", votos: "10" },
    { id: "2", nome: "Sósia do Neymar", nota: "7.4", votos: "12" },
    { id: "3", nome: "Cano Sacudo", nota: "10", votos: "2" },
  ];
  const partidaDados = [
    { id: "1", nome: "vs Flamerda", resultado: "6x4", data: "22/04/24", local:"Maracana" },
    { id: "2", nome: "vs Bostafogo", resultado: "6x4", data: "22/04/24", local: "Tapetinho" },
    { id: "3", nome: "vs Internacional", resultado: "6x4", data: "22/04/24", local: "Beira-rio" },
    { id: "4", nome: "vs River Plate", resultado: "6x4", data: "22/04/24", local: "Monumental" },
    { id: "5", nome: "vs Vascu", resultado: "6x4", data: "22/04/24", local: "Sao Ratuario" },
  ];

  const time = "Fluminense";
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div>
        <NavBar/>
            {time ? (
            <div>
            <h1 className="nomeTime">{time}</h1>
            <div>
                <h1 className="tituloPag">Jogadores</h1>
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
            <div>
                <h1 className="tituloPag">Partidas</h1>
                {show2 ? (
                <div>
                    <div>
                        {partidaDados.map((partida, i) => (
                            <PartidaComponente
                            key={partida.id}
                            id={partida.id}
                            nome={partida.nome}
                            resultado={partida.resultado}
                            data={partida.data}
                            local={partida.local}
                            />
                        ))}
                    </div>
                    <div>
                        <Button show={show2} setShow={setShow2} />
                    </div>
                </div>
                ) : (
                <div>
                    <div>
                        {partidaDados.slice(0, 2).map((partida, i) => (
                            <PartidaComponente
                            key={partida.id}
                            id={partida.id}
                            nome={partida.nome}
                            resultado={partida.resultado}
                            data={partida.data}
                            local={partida.local}
                            />
                        ))}
                    </div>
                    <div>
                        <Button show={show2} setShow={setShow2} />
                    </div>
                </div>
                )}
            </div>
        </div>
            ) : (
                <div className="">
                    <div className="texto-container">
                        <div className="messageBox">
                            <h1>você não está participando de nenhum torneio no momento.</h1>
                            <h1 className="espaço">vamos resolver isso?</h1>
                        </div>
                        <div className="messageBox">
                            <h1>você pode buscar um torneio aberto, criar o seu, ou aceitar um convite.</h1>
                        </div>
                    </div>
                    <div className="texto-container">
                        <button className="botaoCrieTime">crie um time</button>
                    </div>  
                </div>
            )}
    </div>
  );
};

export default Time;