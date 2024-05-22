import { React, useState, useEffect } from "react";
import NavBar from "../../components/navBar/navBar";
import Torneiomjr from "../../components/meustorneioscomponent/meustorneioscomponent";
import "./meusTorneios.css";
import Button from "../../components/button/button";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const MeusTorneios = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((rootReducer) => rootReducer.user);

  const [torneios, setTorneios] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchTorneio = async () => {
      try {
        const response = await axios.get("http://localhost:3004/Torneio");
        const torneiosData = response.data;

        const userTorneios = torneiosData.filter(
          (torneio) => torneio.userIdDonoTorneio === currentUser.user.id
        );

        setTorneios(userTorneios);
      } catch (error) {
        console.error("Erro ao buscar os torneios:", error);
      }
    };

    fetchTorneio();
  }, [currentUser.user.id]);

  const handleClickCriarTorneio = () => {
    navigate("/criartorneio");
  };

  if (!currentUser.logged) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar />
      {torneios.length > 0 ? (
        <div>
          <h1 className="tituloPag">meus torneios</h1>
          {show ? (
            <div>
              {torneios.map((torneio) => (
                <Torneiomjr
                  key={torneio.id}
                  nome={torneio.nomeTorneio}
                  tipoTorneio={torneio.tipoTorneio}
                  qtdtimes={`${torneio.qtdTimes} times`}
                  local={torneio.localTorneio}
                />
              ))}
              <Button show={show} setShow={setShow} />
            </div>
          ) : (
            <div>
              {torneios.slice(0, 2).map((torneio) => (
                <Torneiomjr
                  key={torneio.id}
                  nome={torneio.nomeTorneio}
                  tipoTorneio={torneio.tipoTorneio}
                  qtdtimes={`${torneio.qtdTimes} times`}
                  local={torneio.localTorneio}
                />
              ))}
              <Button show={show} setShow={setShow} />
            </div>
          )}
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
            <button className="botaoCrieCampeonato" onClick={handleClickCriarTorneio}>criar torneio</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeusTorneios;
