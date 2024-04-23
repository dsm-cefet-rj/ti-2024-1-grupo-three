import { React, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./meusTorneios.css";

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
            {campeonato? (
            <div>
            
            <div>
              <h1 className="tituloPag">meus torneios</h1>
              {show ? (
                <div>
                  <div className="caixaTorneios">
                    {partidaDados.map((partida) => (
                      <div className="Meustorneios" key={partida.id}>
                        <div className="NomedoCamp">
                            {partida.nome}                      
                          </div>
                          <div className="parte2">
                          {partida.tipoTorneio}
                          {partida.local}
                          <div>
                          {partida.qtdPartidas}
                          </div>
                          
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    {partidaDados.slice(0, 3).map((partida, i) => (
                      <div className="caixaTorneios">
                      <div className="MeusTorneios" key={partida.id}>                        
                          <div className="NomedoCamp">
                            {partida.nome}                         
                         </div>
                          <div className="parte2">                         
                          {partida.tipoTorneio}
                          <div className="parte3">
                           {partida.qtdPartidas}   
                          </div>
                          
                          <div>
                          {partida.local}
                          </div>

                        </div>
                      </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="">
            <div className="textocontent">
              <div className="Mensagens">
                <h1>Você não está participando de nenhum torneio no momento.</h1>
                <h1 className="espaço2">Vamos resolver isso?</h1>
              </div>
              <div className="Mensagens">
                <h1>Você pode buscar um torneio aberto, criar o seu, ou aceitar um convite.</h1>
              </div>
            </div>
            <div className="textocontent">
              <button className="botaoCrieCampeonato">Crie um torneio</button>
            </div>
          </div>
        )}
      </div>
  );
};

export default MeusTorneios;