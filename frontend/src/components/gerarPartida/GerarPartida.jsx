import React, { useState } from "react";
import axios from "axios"; // ou use fetch
import "../gerarPartida/gerarPartida.css";

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

const GerarPartida = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3004/api/partidas/${inputValue}`
      );
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
    }
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div>
        {isOpen ? (
          <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <div className="envio-convite-container">
              <h2>Digite o ID do Torneio:</h2>
              <form className="envio-convite-form" onSubmit={handleSubmit}>
                <label>
                  Digite um valor:
                  <input
                    className="input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </label>
                <button type="submit">Enviar</button>
              </form>
            </div>
          </Modal>
        ) : (
          <button onClick={handleOpenModal} className="buttonconvite">
            Gerar Partidas
          </button>
        )}
      </div>
    </div>
  );
};

export default GerarPartida;
