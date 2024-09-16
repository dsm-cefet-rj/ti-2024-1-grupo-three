import { React, useState, useEffect } from "react";
import NavBar from "../../components/navBar/navBar";
import Torneiomjr from "../../components/meustorneioscomponent/meustorneioscomponent";
import "./meusTorneios.css";
import Button from "../../components/button/button";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

/**
 * Componente MeusTorneios.
 *
 * Este componente exibe os torneios que o usuário criou (como dono) e os torneios nos quais o time do usuário está participando.
 * Faz chamadas à API para buscar os torneios baseados no usuário autenticado.
 *
 * @component
 */
const MeusTorneios = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const timeUser = useSelector((rootReducer) => rootReducer.timeUser);
  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwtDecode(token);
  const [torneiosDono, setTorneiosDono] = useState([]);
  const [torneiosParticipante, setTorneiosParticipante] = useState([]);
  const [show, setShow] = useState(false);

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    /**
     * Busca os torneios criados pelo usuário e os torneios onde o time do usuário está participando.
     * Realiza chamadas à API para buscar dados dos torneios.
     *
     * @async
     * @function fetchTorneio
     */
    const fetchTorneio = async () => {
      try {
        let torneiosTime = [];
        let torneiosDono = [];
        try {
          const responseTorneioDono = await axios.get(
            `http://localhost:3004/torneio/dono/${decodedToken.id}` //pegar torneios que o usuario é dono
          );
          if (responseTorneioDono.status === 200 && responseTorneioDono.data) {
            torneiosDono = responseTorneioDono.data;
            setTorneiosDono(torneiosDono);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
          } else {
            console.error("Erro ao buscar torneios do dono:", error);
          }
        }
        // Busca os torneios onde o usuário é o dono

        try {
          const time = timeUser;
          if (time) {
            // Busca os torneios que o time está participando
            const responseTorneio = await axios.get(
              `http://localhost:3004/torneio/time/${time._id}` //buscar torneios por id do time
            );

            torneiosTime = responseTorneio.data;
            setTorneiosParticipante(torneiosTime);
          }
        } catch (error) {}

        // Mesmo que vazio, não causará erro
        // Mesmo que vazio, não causará erro
      } catch (error) {
        console.error("Erro ao buscar os torneios:", error);
      }
    };

    fetchTorneio();
  }, [decodedToken.id]);

  const handleClickCriarTorneio = () => {
    navigate("/criartorneio");
  };

  if (!currentUser.logged) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar />
      {!Array.isArray(torneiosDono) ? (
        <div>
          <h1 className="tituloPag1">meus torneios</h1>
          <div className="meustorneios">
            <Torneiomjr
              key={torneiosDono._id}
              id={torneiosDono._id}
              nome={torneiosDono.nomeTorneio}
              tipoTorneio={torneiosDono.tipoTorneio}
              qtdtimes={`${torneiosDono.qtdTimes} times`}
              local={torneiosDono.localTorneio}
            />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="tituloPag1">meus torneios</h1>

          <div className="textocontent">
            <div className="Mensagens1">
              <h1>você não é dono de nenhum torneio no momento.</h1>

              <h1>você pode criar o seu próprio torneio.</h1>
            </div>
            <div className="textocontent">
              <button
                className="botaoCrieCampeonato"
                onClick={handleClickCriarTorneio}
              >
                criar torneio
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="tituloPag1">torneio participante</h1>
      {torneiosParticipante.length > 0 ? (
        <div>
          {show ? (
            <div>
              {torneiosParticipante.map((torneioParticipante) => (
                <Torneiomjr
                  key={torneioParticipante._id}
                  id={torneioParticipante._id}
                  nome={torneioParticipante.nomeTorneio}
                  tipoTorneio={torneioParticipante.tipoTorneio}
                  qtdtimes={`${torneioParticipante.qtdTimes} times`}
                  local={torneioParticipante.localTorneio}
                />
              ))}
              <Button show={show} setShow={setShow} />
            </div>
          ) : (
            <div>
              {torneiosParticipante.slice(0, 2).map((torneioParticipante) => (
                <Torneiomjr
                  key={torneioParticipante._id}
                  id={torneioParticipante._id}
                  nome={torneioParticipante.nomeTorneio}
                  tipoTorneio={torneioParticipante.tipoTorneio}
                  qtdtimes={`${torneioParticipante.qtdTimes} times`}
                  local={torneioParticipante.localTorneio}
                />
              ))}
              <Button show={show} setShow={setShow} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="textocontent">
            <div className="Mensagens1">
              <h1>você não está participando de nenhum torneio no momento.</h1>

              <h1>
                seu time pode receber um convite de torneio e aceitar para
                participar de um.
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeusTorneios;
