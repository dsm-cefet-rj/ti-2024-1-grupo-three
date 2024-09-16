import { React, useState, useEffect } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import PartidaComponente from "../../components/partidaComponent/partidaComponente";
import EnviarConvite from "../../components/EnvioConvite/EnvioConvite";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "./MostrarTorneio.css";
import axios from "axios";
import Time from "../../components/time/time";
import { useParams } from "react-router-dom";

/**
 * Componente MostrarTorneio.
 *
 * Este componente exibe os detalhes de um torneio, incluindo os times participantes e suas partidas.
 * Faz chamadas à API para buscar os times e partidas do torneio com base no ID do torneio.
 *
 * @component
 */
const MostrarTorneio = () => {
  const navigate = useNavigate(); // Hook para navegação de rotas
  const [times, setTimes] = useState([]); // Estado para armazenar os times participantes
  const [partidas, setPartidas] = useState([]); // Estado para armazenar as partidas do torneio
  const { id } = useParams(); // Extrai o parâmetro 'id' da URL

  const token = useSelector((state) => state.auth.token); //Seleciona o token de autenticação do estado Redux

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    /**
     * Busca os times participantes e as partidas relacionadas ao torneio.
     * Realiza chamadas à API para buscar dados dos times e suas respectivas partidas.
     *
     * @async
     * @function fetchTime
     */
    const fetchTime = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/torneio/meutime/${id}`
        );
        setTimes(response.data.Participantes);

        if (times) {
          const partidaDetailsPromises = times.map(async (times) => {
            const partidaResponse = await axios.get(
              `http://localhost:3004/partidas/time/${times}`
            );
            return partidaResponse.data;
          });
          const partidaDetails = await Promise.all(partidaDetailsPromises);
          setPartidas(partidaDetails);
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do time:", error);
      }
    };
    fetchTime();
  }, [id, partidas, times]);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  return (
    <div>
      <NavBar />
      <div>
        <div>
          <h1 className="tituloPag">times</h1>
          {times.length > 0 ? (
            <div>
              {show ? (
                <div>
                  <div>
                    {times.map((id) => (
                      <div key={id}>
                        <Time id={id} />
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
                    {times.slice(0, 2).map((id) => (
                      <div key={id}>
                        <Time id={id} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <Button show={show} setShow={setShow} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div>
                <PartidaComponente
                  key="nenhuma-partida"
                  nome="nenhum time encontrado"
                  resultado=""
                  data=""
                  local=""
                />
              </div>
            </div>
          )}

          <div>
            <h1 className="tituloPag">partidas</h1>
            {partidas.length > 0 ? (
              <div>
                {show2 ? (
                  <div>
                    {partidas.slice(0, 2).map((partida, index) => (
                      <div key={index}>
                        {partida.map((dado) => (
                          <PartidaComponente
                            key={dado._id}
                            nome={
                              dado.isMandante
                                ? `vs ${dado.adversario}`
                                : `vs ${dado.adversario}`
                            }
                            resultado={dado.placar}
                            data={dado.data}
                            local={dado.local}
                          />
                        ))}
                      </div>
                    ))}
                    <div>
                      <Button show={show2} setShow={setShow2} />
                    </div>
                  </div>
                ) : (
                  // Removei as chaves desnecessárias e organizei corretamente o JSX no else
                  <div>
                    {partidas.slice(0, 2).map((partida, index) => (
                      <div key={index}>
                        {partida.slice(0, 1).map((dado) => (
                          <PartidaComponente
                            key={dado._id}
                            nome={
                              dado.isMandante
                                ? `vs ${dado.adversario}`
                                : `vs ${dado.adversario}`
                            }
                            resultado={dado.placar}
                            data={dado.data}
                            local={dado.local}
                          />
                        ))}
                      </div>
                    ))}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostrarTorneio;
