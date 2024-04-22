import { React, useState } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import JogadorN from "../../components/jogadorN/jogadorN";
import PartidaComponente from "../../components/partidaComponent/partidaComponente";
import "./campeonato.css";

const MeusTorneios = ({ id }) => {

  
  const partidaDados = [
    { id: "1", nome: "Fut da Firma", tipoTorneio: "Fechado", qtdPartidas: "8 partidas", local:"Quadra Recreio" },
    { id: "2", nome: "Pelada dos Crias", tipoTorneio: "Aberto", qtdPartidas: "12 partidas", local: "Peninsula" },
    { id: "3", nome: "Futzin cria", tipoTorneio: "Aberto", qtdPartidas: "4 partidas", local: "Freguesia" },
    
  ];

  const time = "VASCO";
  const [show, setShow] = useState(false);

  return (
    <div>
        <NavBar/>
            {!time ? (
            <div>
            <h1 className="nomeTime">{time}</h1>
            <div>
                <h1 className="tituloPag">meus torneios</h1>
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
            ) : (
                <div className="">
                    <div className="texto-container2">
                        <div className="messageBox2">
                            <h1>você não está participando de nenhum torneio no momento.</h1>
                            <h1 className="espaço2">vamos resolver isso?</h1>
                        </div>
                        <div className="messageBox2">
                            <h1>você pode buscar um torneio aberto, criar o seu, ou aceitar um convite.</h1>
                        </div>
                    </div>
                    <div className="texto-container2">
                        <button className="botaoCrieCampeonato">crie um time</button>
                    </div>  
                </div>
            )}
    </div>
  );
};

export default MeusTorneios;