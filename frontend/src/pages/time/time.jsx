import { React, useState, useEffect } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import PartidaComponente from "../../components/partidaComponent/partidaComponente";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "../time/time.css";
import Edit from "../../assets/edit.svg";
import Check from "../../assets/check.svg";
import Jogador from "../../components/jogador/jogador";
import { getPartidasIdTime, addPartidas } from "../../redux/partida/slice";
import {
  addJogadores,
  getJogadores,
  clearJogadores,
} from "../../redux/jogadores/slice";
import {
  deleteTime,
  clearTime,
  updateTime,
  excluirTime,
} from "../../redux/time/slice";

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
  const [nomeTime, setNomeTime] = useState(""); // Estado para armazenar o nome do time
  const [newName, setNewName] = useState("");
  const [show, setShow] = useState(false); // Estado para controlar a exibição de jogadores
  const [show2, setShow2] = useState(false); // Estado para controlar a exibição de partidas
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const timeDados = useSelector((rootReducer) => rootReducer.time);
  const Jogadores = useSelector((rootReducer) => rootReducer.jogadores);
  const Partidas = useSelector((rootReducer) => rootReducer.partidas);
  const [editarNome, setEditarNome] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, setText) => {
    setText(event.target.value);
  };

  const handleEditartrue = () => {
    setEditarNome(true);
  };

  const handleEditarFalse = () => {
    setEditarNome(false);
  };

  // Redireciona para a página de login se o token não estiver presente
  if (!currentUser.logged) {
    return <Navigate to="/login" />;
  }
  const Times = timeDados.timeUser.payload;
  console.log(Times);

  const handleUpdate = (e) => {
    if (currentUser.user._id === Times.userIdDono) {
      if (newName != "") {
        const response = dispatch(
          updateTime({
            nomeTime: newName,
            token: currentUser.logged,
            id: Times._id,
          })
        );
      } else {
        alert("Nome não pode ser vazio");
        handleEditarFalse();
      }
    } else {
      handleEditarFalse();
    }
  };
  useEffect(() => {
    console.log("Iniciando useEffect");
    /**
     * Busca as informações do time do usuário autenticado.
     * Realiza chamadas à API para buscar dados do time, jogadores e partidas.
     *
     * @async
     * @function fetchTime
     */
    const fetchTime1 = async () => {
      try {
        dispatch(clearJogadores());
        console.log("Chamando fetchTime");
        console.log("Times", Times);
        if (Times) {
          setNomeTime(Times.nomeTime);
          console.log("checandoooooooo", Partidas.partidas);

          Times.userId.map(async (userId) => {
            console.log("Buscando jogadores para userId:", userId);
            const userResponse = await dispatch(
              getJogadores({
                id: userId,
                token: currentUser.logged,
              })
            );
            if (userResponse) {
              console.log("Jogadores recebidos:", userResponse.payload);
              dispatch(addJogadores(userResponse.payload));
              //addJogadores
            }
          });
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do time:", error);
      }
    };
    fetchTime1();
    console.log("Finalizando useEffect");
  }, []); //mudar aqui

  const handleSairTime = async (e) => {
    e.preventDefault();
    console.log("saindo do time", Times);
    if (Times.userId.length === 1) {
      const result2 = await dispatch(
        excluirTime({
          timeId: Times._id,
          token: currentUser.logged,
        })
      );
    }
    try {
      console.log("saindo do time", Times);

      const result = await dispatch(
        deleteTime({
          timeId: Times._id,
          id: currentUser.user._id,
          token: currentUser.logged,
        })
      );
      if (result) {
        //se jogadores = 0 , deletar time

        console.log("voce saiu do time", result);
        navigate("/login");
      }

      // Aqui você pode adicionar lógica adicional para lidar com o resultado
    } catch (error) {
      console.error("Erro ao tentar sair:", error);
      alert("Ocorreu um erro ao tentar sair.");
    }
  };

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
            {editarNome === true ? (
              <div className="">
                <input
                  id="nome"
                  className="nomedoTime"
                  placeholder={nomeTime}
                  onChange={(event) => handleChange(event, setNewName)}
                />
                <img
                  src={Check}
                  alt="menu"
                  className="imageedit1"
                  onClick={handleUpdate}
                />
              </div>
            ) : (
              <div className="">
                <h1 className="nomedoTime">{nomeTime}</h1>
                <img
                  src={Edit}
                  alt="menu"
                  className="imageedit1"
                  onClick={handleEditartrue}
                />
              </div>
            )}
          </div>

          <div>
            <h1 className="tituloPag">jogadores</h1>
            {show ? (
              <div>
                <div>
                  {Jogadores.map((jogador) => (
                    <div key={jogador._id}>
                      <Jogador nome={jogador.nome} id={jogador._id} />
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
                  {Jogadores.slice(0, 2).map((jogador) => (
                    <div key={jogador._id}>
                      <Jogador nome={jogador.nome} id={jogador._id} />
                    </div>
                  ))}
                </div>
                <div>
                  <Button show={show} setShow={setShow} />
                </div>
              </div>
            )}
            {/* botao sair do time */}
            <form className="formSairTime" onSubmit={handleSairTime}>
              <div className="sairTime">
                <button className="botaosairTime" type="submit">
                  sair do time
                </button>
              </div>
            </form>
          </div>
          <div>
            <h1 className="tituloPag">partidas</h1>

            {Partidas.partidas.length > 0 ? (
              <div>
                {show2 ? (
                  <div>
                    <div className="envoltoPartidas">
                      {Partidas.partidas.map((partida) => (
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
                      {Partidas.partidas.slice(0, 2).map((partida) => (
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
