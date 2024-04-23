import { React, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import Torneiomjr from "../../components/meustorneioscomponent/meustorneioscomponent";
import "./meusTorneios.css";
import Button from "../../components/button/button";

const MeusTorneios = ({ id }) => {

  
  const partidaDados = [
    { id: "1", nome: "Fut da Firma", tipoTorneio: "Torneio Fechado", qtdPartidas: "8 partidas", local:"Quadra Recreio" },
    { id: "2", nome: "Pelada dos Crias", tipoTorneio: "Torneio Aberto", qtdPartidas: "12 partidas", local: "Peninsula" },
    { id: "3", nome: "Futzin cria", tipoTorneio: "Torneio Aberto", qtdPartidas: "4 partidas", local: "Freguesia" },
    
  ];

  const campeonato = "VASCO";
  const [show, setShow] = useState(false);

  return (
    <div>
        <NavBar/>
            {campeonato ? (
            <div>
            <div>
                <h1 className="tituloPag">meus torneios</h1>
                {show ? (
                <div>
                    <div>
                        {partidaDados.map((Torneio, i) => (
                            <Torneiomjr
                            key={Torneio.id}
                            nome={Torneio.nome}
                            tipoTorneio={Torneio.tipoTorneio}
                            qtdPartidas={Torneio.qtdPartidas}
                            local={Torneio.local}
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
                        {partidaDados.slice(0, 2).map((Torneio, i) => (
                            <Torneiomjr
                            key={Torneio.id}
                            nome={Torneio.nome}
                            tipoTorneio={Torneio.tipoTorneio}
                            qtdPartidas={Torneio.qtdPartidas}
                            local={Torneio.local}
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
                <div>
                    <div className="textocontent">
                        <div className="Mensagens">
                            <h1>você não está participando de nenhum torneio no momento.</h1>
                            <h1 className="espaço2">vamos resolver isso?</h1>
                        </div>
                        <div className="Mensagens">
                            <h1>você pode buscar um torneio aberto, criar o seu, ou aceitar um convite.</h1>
                        </div>
                    </div>
                    <div className="textocontent">
                        <button className="botaoCrieCampeonato">crie um time</button>
                    </div>  
                </div>
            )}
    </div>
  );
};

export default MeusTorneios;

