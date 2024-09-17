import { React, useState, useEffect } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import PartidaComponente from "../../components/partidaComponent/partidaComponente";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "./MostrarTorneio.css";
import Time from "../../components/time/time";
import { useParams } from "react-router-dom";
import { getTimesByTorneio } from "../../redux/torneios/slice";
import { getPartidasIdTime } from "../../redux/partida/slice";

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
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const [partidas, setPartidas] = useState([]); // Estado para armazenar as partidas do torneio
  const { id } = useParams();
  const dispatch = useDispatch(); // Extrai o parâmetro 'id' da URL
 //Seleciona o token de autenticação do estado Redux

  if (!currentUser.logged) {
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
        const response = await dispatch(
          getTimesByTorneio({
            id: id,
            token: currentUser.logged
          })
        )
        console.log(response);
        setTimes(response.payload.Participantes);

        if (times) {
          const partidaDetailsPromises = times.map(async (times) => {
            const response = await dispatch(
              getPartidasIdTime({
                id: times.id,
                token: currentUser.logged
              })
            )
            return response.payload;
          });
          const partidaDetails = await Promise.all(partidaDetailsPromises);
          setPartidas(partidaDetails);
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do time:", error);
      }
    };
    fetchTime();
  }, []);

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
