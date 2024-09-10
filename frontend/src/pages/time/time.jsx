import { React, useState, useEffect } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import PartidaComponente from "../../components/partidaComponent/partidaComponente";
import EnviarConvite from "../../components/EnvioConvite/EnvioConvite";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "./time.css";
import axios from "axios";
import Jogador from "../../components/jogador/jogador";
import { jwtDecode } from "jwt-decode";

/**
 * Componente Time.
 *
 * Este componente exibe as informações de um time específico, incluindo jogadores e partidas.
 * O usuário deve estar autenticado para visualizar esta página.
 * Faz chamadas à API para buscar dados do time, jogadores e partidas.
 *
 * @component
 */
const Time = () => {
  const navigate = useNavigate(); // Hook para navegação
  const [jogadores, setJogadores] = useState([]); // Estado para armazenar jogadores do time
  const [partidas, setPartidas] = useState([]); // Estado para armazenar partidas do time
  const [nomeTime, setNomeTime] = useState(""); // Estado para armazenar o nome do time
  const [show, setShow] = useState(false); // Estado para controlar a exibição de jogadores
  const [show2, setShow2] = useState(false); // Estado para controlar a exibição de partidas

  const token = useSelector((state) => state.auth.token); // Seleciona o token de autenticação do estado Redux
  const decodedToken = jwtDecode(token); // Decodifica o token JWT
  console.log(decodedToken);

  // Redireciona para a página de login se o token não estiver presente
  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    /**
     * Busca as informações do time do usuário autenticado.
     * Realiza chamadas à API para buscar dados do time, jogadores e partidas.
     *
     * @async
     * @function fetchTime
     */
    const fetchTime = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/api/time/user/${decodedToken.id}`
        );
        const time = response.data;
        console.log(time);

        if (time) {
          setNomeTime(time.nomeTime);
          const partidaResponse = await axios.get(
            `http://localhost:3004/api/partidas/time/${time._id}`
          );
          const partidas = partidaResponse.data;
          console.log(partidas);
          if (partidas) {
            setPartidas(partidas);
          }
          const userDetailsPromises = time.userId.map(async (userId) => {
            const userResponse = await axios.get(
              `http://localhost:3004/api/user/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho
                },
              }
            );
            return userResponse.data;
          });
          const userDetails = await Promise.all(userDetailsPromises);
          console.log(userDetails);
          setJogadores(userDetails);
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do time:", error);
      }
    };
    fetchTime();
  }, [decodedToken.id]);

  /**
   * Manipula o clique do botão para criar um time.
   * Redireciona para a página de criação de time.
   *
   * @function handleClickCriarTime
   */
  const handleClickCriarTime = () => {
    navigate("/criartime");
  };

  return (
    <div>
      <NavBar />

      {nomeTime ? (
        <div>
          <h1 className="nomeTime">{nomeTime}</h1>
          <div>
            <h1 className="tituloPag">Jogadores</h1>
            {show ? (
              <div>
                <div>
                  {jogadores.map((jogador) => (
                    <div key={jogador._id}>
                      <Jogador nome={jogador.nome} />
                    </div>
                  ))}
                </div>
                <div>
                  <Button show={show} setShow={setShow} />
                </div>
              </div>
            ) : (
              <div>
                <div>
                  {jogadores.slice(0, 2).map((jogador) => (
                    <div key={jogador._id}>
                      <Jogador nome={jogador.nome} />
                    </div>
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
            {partidas.length > 0 ? (
              <div>
                <div>
                  {partidas.map((partida) => (
                    <PartidaComponente
                      key={partida._id}
                      nome={
                        partida.isMandante
                          ? `vs. ${partida.adversario}`
                          : `@${partida.adversario}`
                      }
                      resultado={partida.placar}
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
                  <PartidaComponente
                    key="nenhuma-partida"
                    nome="Nenhuma partida encontrada"
                    resultado=""
                    data=""
                    local=""
                  />
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
              <h1>você não está participando de nenhum time no momento.</h1>
              <h1 className="espaço">vamos resolver isso?</h1>
            </div>
            <div className="messageBox">
              <h1>
                você pode buscar um time aberto, criar o seu, ou aceitar um
                convite.
              </h1>
            </div>
          </div>
          <div className="texto-container">
            <button className="botaoCrieTime" onClick={handleClickCriarTime}>
              crie um time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Time;
