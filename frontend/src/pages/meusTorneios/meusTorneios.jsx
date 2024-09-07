import { React, useState, useEffect } from "react";
import NavBar from "../../components/navBar/navBar";
import Torneiomjr from "../../components/meustorneioscomponent/meustorneioscomponent";
import "./meusTorneios.css";
import Button from "../../components/button/button";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MeusTorneios = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  const [torneiosDono, setTorneiosDono] = useState([]);
  const [torneiosParticipante, setTorneiosParticipante] = useState([]);
  const [show, setShow] = useState(false);
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchTorneio = async () => {
      try {
        let torneiosTime = [];
        let torneiosDono = [];
        
        // Busca os torneios onde o usuário é o dono
        const responseTorneioDono = await axios.get(
          `http://localhost:3004/api/torneio/dono/${decodedToken.id}`
        );

        if (responseTorneioDono.status === 200 && responseTorneioDono.data) {
          torneiosDono = responseTorneioDono.data;
        }

        const responseTime = await axios.get(
          `http://localhost:3004/api/time/user/${decodedToken.id}`
        );

        const time = responseTime.data;
        console.log('Time:',time);
        console.log('Time ID:', time._id);
        if (time) {
          // Busca os torneios que o time está participando
          const responseTorneio = await axios.get(
            `http://localhost:3004/api/torneio/time/${time._id}`
          );
          
       

            torneiosTime = responseTorneio.data;
            console.log('123546:', responseTorneio)
          
        }

        setTorneiosDono(torneiosDono); // Mesmo que vazio, não causará erro
        setTorneiosParticipante(torneiosTime); // Mesmo que vazio, não causará erro
        console.log(torneiosDono)
        console.log('Torneios Participantes:', torneiosTime)
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
          <h1 className="tituloPag">meus torneios</h1>
          <div>
            
              <Torneiomjr
                key={torneiosDono._id}
                nome={torneiosDono.nomeTorneio}
                tipoTorneio={torneiosDono.tipoTorneio}
                qtdtimes={`${torneiosDono.qtdTimes} times`}
                local={torneiosDono.localTorneio}
              />
            
          </div>
        </div>
      ) : (
        
        <div>
          
          <h1 className="tituloPag">meus torneios</h1>

          <div className="textocontent">
            <div className="Mensagens">
              <h1>você não é dono de nenhum torneio no momento.</h1>
              <h1 className="espaço2">vamos resolver isso?</h1>
            </div>
            <div className="Mensagens">
              <h1>você pode criar o seu um convite.</h1>
            </div>
            <div className="textocontent">
            <button className="botaoCrieCampeonato" onClick={handleClickCriarTorneio}>criar torneio</button>
            </div>
          </div>
          
        </div>
      )}
      
      <h1 className="tituloPag">torneio participante</h1>
      {torneiosParticipante.length > 0 ? (
        <div>
          {show ? (
            <div>
              {torneiosParticipante.map((torneioParticipante) => (
                <Torneiomjr
                  key={torneioParticipante._id}
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
            <div className="Mensagens">
              <h1>você não está participando de nenhum torneio no momento.</h1>
            </div>
            <div className="Mensagens">
              <h1>seu time pode receber um convite de torneio e aceitar para participar de um.</h1>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default MeusTorneios;
