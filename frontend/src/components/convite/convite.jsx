import React, { useState, useEffect } from "react";
import axios from "axios";
import "./convite.css";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="modal-container">
        <div className="modal">
          <button className="fechar" onClick={onClose}>
            x
          </button>
          <div className="modal-content">
            <p> {children} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Convite = () => {
  const [convitesTime, setConvitesTime] = useState([]);
  const [convitesTorneio, setConvitesTorneio] = useState([]);
  const [teamNames, setTeamNames] = useState({}); // Estado para armazenar nomes dos times
  const [torneioNames, setTorneioNames] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [travado, setTravado] = useState(false);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  useEffect(() => {
    const fetchConvites = async () => {
      try {
        // Buscar convites para times
        const responseTime = await axios.get(
          `http://localhost:3004/api/convite?idDestinatario=${userId}`
        );
        if (responseTime) {
          setConvitesTime(responseTime.data);
        }

        // Buscar convites para torneios
<<<<<<< Updated upstream

        const responseDono = await axios.get(
          `http://localhost:3004/api/time/dono/${userId}`
        );
        if (responseDono.data) {
          //console.log(responseDono)
          const timeUser = responseDono.data;
          const responseTorneio = await axios.get(
            `http://localhost:3004/api/convite/time/${timeUser._id}`
          );
          //console.log(responseDono)
          //console.log(responseTorneio.data)
          setConvitesTorneio(responseTorneio.data);
        }
=======
        
          const responseDono = await axios.get(
          `http://localhost:3004/api/time/dono/${userId}`)          
          if (responseDono.data) {
            const timeUser = responseDono.data;
            const responseTorneio = await axios.get(
              `http://localhost:3004/api/convite/time/${timeUser._id}`
            );
            setConvitesTorneio(responseTorneio.data);
          }
        
          
          
        
        
>>>>>>> Stashed changes
      } catch (error) {
        console.error("Erro ao buscar convites", error);
      }
    };

    const fetchTeamNames = async () => {
      const names = {};
      for (const convite of convitesTime) {
        if (!teamNames[convite.timeRemetente]) {
          try {
            const response = await axios.get(
              `http://localhost:3004/api/time/${convite.timeRemetente}`
            );
            names[convite.timeRemetente] = response.data.nomeTime; // Assumindo que o nome está no campo 'name'
          } catch (error) {
            console.error("Erro ao buscar o nome do time:", error);
            names[convite.timeRemetente] = "Nome do time desconhecido";
          }
        }
      }
      setTeamNames((prevNames) => ({ ...prevNames, ...names }));
    };
    const fetchTorneioNames = async () => {
      const namesTorneio = {};
<<<<<<< Updated upstream
      for (const convite of convitesTorneio) {
        if (!torneioNames[convite.torneio]) {
          try {
            console.log(convite.torneio);
            const response = await axios.get(
              `http://localhost:3004/api/torneio/${convite.torneio}`
            );
            console.log(convite.torneio);
            console.log(response.data.nomeTorneio);
=======
      for(const convite of convitesTorneio) {
        if(!torneioNames[convite.torneio]){
          try{
            const response = await axios.get(`http://localhost:3004/api/torneio/${convite.torneio}`)
>>>>>>> Stashed changes
            namesTorneio[convite.torneio] = response.data.nomeTorneio;
          } catch (error) {
            console.error("Erro ao buscar nome do torneio:", error);
            namesTorneio[convite.torneio] = "Nome Desconhecido";
          }
        }
      }
      setTorneioNames((prevNamesTorneio) => ({
        ...prevNamesTorneio,
        ...namesTorneio,
      }));
    };

    if (userId && isOpen) {
      fetchConvites();
    }

    // Atualizar nomes dos times quando os convites são carregados
    if (convitesTime.length > 0) {
      fetchTeamNames();
    }
    if (convitesTorneio.length > 0) {
      fetchTorneioNames();
    }
  }, [userId, isOpen, convitesTime, convitesTorneio]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleRejeitar = async (idConvite) => {
    await axios.delete(`http://localhost:3004/api/convite/${idConvite}`);
    alert("Convite Recusado!");
    // Atualizar convites após rejeitar
    setConvitesTime((prev) =>
      prev.filter((convite) => convite._id !== idConvite)
    );
  };

  const handleAceitar = async (idConvite) => {
<<<<<<< Updated upstream
    console.log("chamou");
    console.log(idConvite);
=======
>>>>>>> Stashed changes
    // Lógica para aceitar o convite com o idConvite
    const response = await axios.put(
      `http://localhost:3004/api/convite/aceitar/${idConvite}`
    );
    if (response.status === 200) {
      alert("Convite Aceito!");
      // Atualizar convites após aceitar
      setConvitesTime((prev) =>
        prev.filter((convite) => convite._id !== idConvite)
      );
    } else {
      alert("Erro ao aceitar!");
    }
  };

  return (
    <div>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <div className="container-convites">
            <h2 className="tituloconvites">seus convites</h2>

            {/* Convites para Times */}
            <p className="convites-title">convites para times</p>
            {convitesTime.length > 0 ? (
              convitesTime.map((convite) => (
                <div key={convite._id} className="conteudo-convites">
                  <p>
                    time: {teamNames[convite.timeRemetente] || "Carregando..."}
                  </p>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn-aceita"
                      onClick={() => handleAceitar(convite._id)}
                    >
                      aceitar
                    </button>
                    <button
                      type="button"
                      className="btn-recusa"
                      onClick={() => handleRejeitar(convite._id)}
                    >
                      rejeitar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Você não tem convites para times no momento.</p>
            )}

            {/* Convites para Torneios */}
            <p className="convites-title">convites para torneios</p>
            {convitesTorneio.length > 0 ? (
              convitesTorneio.map((convite) => (
                <div key={convite._id} className="conteudo-convites">
                  <p>
                    torneio: {torneioNames[convite.torneio] || "Carregando..."}
                  </p>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn-aceita"
                      onClick={() => handleAceitar(convite._id)}
                    >
                      aceitar
                    </button>
                    <button
                      type="button"
                      className="btn-recusa"
                      onClick={() => handleRejeitar(convite._id)}
                    >
                      rejeitar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Você não tem convites para torneios no momento.</p>
            )}
          </div>
        </Modal>
      ) : (
        <button onClick={handleOpenModal} className="buttonconvite">
          Convites
        </button>
      )}
    </div>
  );
};

export default Convite;
