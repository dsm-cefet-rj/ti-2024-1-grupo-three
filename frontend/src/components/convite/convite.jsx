import React from "react";
import "./convite.css";

import { useState } from "react";

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

const Convite = (idConvite) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  // modal ficaria na navbar, e abriria quando clicar em convites
  {
    /* <button onClick={handleOpenModal}>Convites</button>
<Modal isOpen={isOpen} onClose={handleCloseModal}>
      </Modal> */
  }
  return (
    <div className="tudodo">
      <div className="container-convites">
        <h1 className="tituloconvites">seus convites</h1>
        {/* //modal entra aqui */}
        <div className="conteudo-convites">
          <p className="testetetete">tetste</p>
          <button type="submit" className="btn-recusa">
            rejeitar
          </button>
          <button type="submit" className="btn-aceita">
            aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Convite;
