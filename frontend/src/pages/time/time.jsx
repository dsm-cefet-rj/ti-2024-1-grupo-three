import { React, useState, useEffect } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import PartidaComponente from "../../components/partidaComponent/partidaComponente";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "../time/time.css";
import Edit from "../../assets/edit.svg";
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
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const Jogadores = useSelector((rootReducer) => rootReducer.timeUser);
  const token = useSelector((state) => state.auth.token); // Seleciona o token de autenticação do estado Redux
  const decodedToken = jwtDecode(token); // Decodifica o token JWT

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
        const response = await dispatch(
          getTimeByUserId({
            userId: currentUser.user.id,
            token: currentUser.logged,
          })
        );
        if (response) {
          dispatch(addTime(response));
          dispatch(addJogadores(response.userId)); //criar add jogadreos
        }
        console.log(response);
        const time = response.data;
        //get time ja esta com redux
        if (time) {
          setNomeTime(time.nomeTime);
          const partidaResponse = await axios.get(
            `http://localhost:3004/api/partidas/time/${time._id}`
          );
          const partidas = partidaResponse.data;
          if (partidas) {
            setPartidas(partidas);
          }
          //////// partida ainda nao foi alterado
          const userDetailsPromises = Jogadores.map(async (userId) => {
            const userResponse = await axios.get(
              `http://localhost:3004/api/user/${userId}`, //botar rota do redux
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho
                },
              }
            );
            return userResponse.data;
          });
          const userDetails = await Promise.all(userDetailsPromises);
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
        <div className="envoltoJogPar">
          <div className="nometimeflex">
            <h1 className="nomedoTime">{nomeTime}</h1>
            <img src={Edit} alt="menu" className="imageedit1" />
          </div>

          <div>
            <h1 className="tituloPag">jogadores</h1>
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
            {/* botao sair do time */}
            <form
              className="formSairTime"
              // onSubmit={(values) => {
              //   handleSubmitForm(values);
              // }}
            >
              <div className="sairTime">
                <button className="botaosairTime" type="submit">
                  sair do time
                </button>
              </div>
            </form>
          </div>
          <div>
            <h1 className="tituloPag">partidas</h1>

            {partidas.length > 0 ? (
              <div>
                {show2 ? (
                  <div>
                    <div className="envoltoPartidas">
                      {partidas.map((partida) => (
                        <PartidaComponente
                          key={partida._id}
                          nome={
                            partida.isMandante
                              ? ` vs. ${partida.adversario}`
                              : ` vs. ${partida.adversario}`
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
                    <div className="envoltoPartidas">
                      {partidas.slice(0, 2).map((partida) => (
                        <PartidaComponente
                          key={partida._id}
                          nome={
                            partida.isMandante
                              ? ` vs. ${partida.adversario}`
                              : ` vs. ${partida.adversario}`
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
                )}
              </div>
            ) : (
              <div>
                <div>
                  <PartidaComponente
                    key="nenhuma-partida"
                    nome="nenhuma partida encontrada"
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
        <div>
          <div className="texto-container">
            <div className="messageBox">
              <h1>você não está participando de nenhum time no momento.</h1>
              <h1>vamos resolver isso?</h1>
            </div>
            <div className="messageBox">
              <h1>
                você pode criar o seu próprio time, ou aceitar um convite para
                participar de um.
              </h1>
            </div>
          </div>
          <div className="formcrietime">
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
