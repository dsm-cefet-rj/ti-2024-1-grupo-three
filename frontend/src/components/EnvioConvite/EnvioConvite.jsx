import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enviarConviteAsync } from "../../redux/convite/slice";
import axios from "axios";
import "../EnvioConvite/EnvioConvite.css";

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

const EnvioConvite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [idDestinatario, setIdDestinatario] = useState("");
  const loggedUser = useSelector((state) => state.user.loggedUser); // Assumindo que o usuário logado está armazenado no state.user.loggedUser
  const dispatch = useDispatch();
  const [idTimeConvite, setIdTimeConvite] = useState("");
  const [idCriadorConvite, setIdCriadorConvite] = useState("");

  useEffect(() => {
    if (loggedUser) {
      buscarInformacoesUsuario(loggedUser.id);
    }
  }, [loggedUser]);

  const buscarInformacoesUsuario = async (userId) => {
    try {
      // Busca o time do qual o usuário é dono
      const responseTime = await axios.get(
        `http://localhost:3004/time?userIdDono=${userId}`
      );
      if (responseTime.data.length > 0) {
        setIdTimeConvite(responseTime.data[0].id);
      } else {
        setIdTimeConvite(""); // Trate o caso em que o usuário não possui time
      }

      // Define o próprio usuário como criador do convite
      setIdCriadorConvite(userId);
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //*if (!idTimeConvite || !idCriadorConvite || !idDestinatario) {
    //  alert("Por favor, preencha todos os campos");
    //  return;
    // }

    const convite = {
      idTimeConvite,
      idCriadorConvite,
      idDestinatario,
    };

    dispatch(enviarConviteAsync(convite));
    setIdDestinatario("");
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <div className="envio-convite-container">
            <h2>Enviar Convite</h2>
            <form onSubmit={handleSubmit} className="envio-convite-form">
              <div>
                <label htmlFor="idDestinatario">ID do Destinatário:</label>
                <input
                  className="caixa-destinatario"
                  type="text"
                  id="idDestinatario"
                  value={idDestinatario}
                  onChange={(e) => setIdDestinatario(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Enviar Convite</button>
            </form>
          </div>
        </Modal>
      ) : (
        <button onClick={handleOpenModal} className="buttonconvite">
          Enviar Convites
        </button>
      )}
    </div>
  );
};

export default EnvioConvite;
