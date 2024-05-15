import { React, useState, useEffect } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import PartidaComponente from "../../components/partidaComponent/partidaComponente";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "./time.css";
import axios from "axios";
import Jogador from "../../components/jogador/jogador";

const Time = () => {
  const navigate = useNavigate();
  const [jogadores, setJogadores] = useState([]);
  const partidaDados = [
    {
      id: "1",
      nome: "vs Flamengo",
      resultado: "6x4",
      data: "23/04/24",
      local: "Maraca",
    },
    {
      id: "2",
      nome: "vs Botafogo",
      resultado: "6x4",
      data: "22/04/24",
      local: "Tapetinho",
    },
    {
      id: "3",
      nome: "vs Internacional",
      resultado: "6x6",
      data: "21/04/24",
      local: "Beira-rio",
    },
    {
      id: "4",
      nome: "vs River Plate",
      resultado: "6x4",
      data: "20/04/24",
      local: "Monumental",
    },
    {
      id: "5",
      nome: "vs Vascão",
      resultado: "0x6",
      data: "19/04/24",
      local: "São Janu",
    },
  ];
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  if (!currentUser.logged) {
    return <Navigate to="/login" />;
  }
  const [nomeTime, setNomeTime] = useState("");
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get("http://localhost:3004/time");
        const times = response.data;
        const userTeam = times.find(
          (time) =>
            time.idUser && time.idUser.some((id) => id === currentUser.user.id)
        );
        if (userTeam) {
          setNomeTime(userTeam.nomeTime);
          const userDetailsPromises = userTeam.idUser.map(async (userId) => {
            const userResponse = await axios.get(
              `http://localhost:3004/users/${userId}`
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
  }, [currentUser.user.id]);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
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
                    <div key={jogador.id}>
                      <Jogador nome={jogador.user} />
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
                    <div key={jogador.id}>
                      <Jogador nome={jogador.user} />
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
