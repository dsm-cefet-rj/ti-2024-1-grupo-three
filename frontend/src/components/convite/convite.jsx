import React, { useState } from "react";
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
  const conviiites = [
    { id: "1", nome: "vasco" },
    { id: "2", nome: "flumkimnnse" },
    { id: "3", nome: "flaemngo" },
  ];
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="container-convites">
            <h1 className="tituloconvites">seus convites</h1>
            {/* //modal entra aqui */}
            <div>
              {conviiites.map((convite, i) => (
                <div className="conteudo-convites">
                  <p className="testetetete">{convite.nome}</p>
                  <button type="submit" className="btn-recusa">
                    rejeitar
                  </button>
                  <button type="submit" className="btn-aceita">
                    aceitar
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
