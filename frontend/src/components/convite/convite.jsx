import React, { useState, useEffect } from "react";
import axios from "axios";
import "./convite.css";

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
  const [convites, setConvites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  useEffect(() => {
    const fetchConvites = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/convites?idDestinatario=${loggedUser.id}`);
        setConvites(response.data);
      } catch (error) {
        console.error("Erro ao buscar convites", error);
      }
    };

    if (loggedUser) {
      fetchConvites();
    }
  }, [loggedUser]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleRejeitar = (idConvite) => {
    // Lógica para rejeitar o convite com o idConvite
  };

  const handleAceitar = (idConvite) => {
    // Lógica para aceitar o convite com o idConvite
  };

  return (
    <div>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <div className="container-convites">
            <h1 className="tituloconvites">Seus Convites</h1>

            <div>
              {convites.map((convite, i) => (
                <div key={convite.idConvite}className="conteudo-convites">
                  <p className="testetetete">{convite.idTimeConvite}</p>
                  <button type="button" className="btn-recusa" onClick={() => handleRejeitar(convite.idConvite)}>
                    Rejeitar
                  </button>
                  <button type="button" className="btn-aceita" onClick={() => handleAceitar(convite.idConvite)}>
                    Aceitar
                  </button>
                </div>
              ))}
            </div>
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
