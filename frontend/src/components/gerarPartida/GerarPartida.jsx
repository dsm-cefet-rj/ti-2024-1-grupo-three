import React, { useState } from "react";
import axios from "axios";
import { debounce } from "lodash"; // Importa o debounce do lodash
import "../gerarPartida/gerarPartida.css";
import { criarPartidas } from "../../redux/partida/slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

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
  const navigate = useNavigate(); // Hook para navegação
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Para armazenar os resultados da busca
  const [selectedTorneio, setSelectedTorneio] = useState(null); // Para armazenar o torneio selecionado
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const dispatch = useDispatch();

  // Função com debounce para limitar as chamadas da API
  const debouncedSearch = debounce(async (searchValue) => {
    if (searchValue.length > 1) {
      // Busca apenas se houver mais de 1 caractere
      try {
        const response = await axios.get(
          `http://localhost:3004/torneio?nome_like=${searchValue}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Erro ao buscar torneios:", error);
      }
    } else {
      setSearchResults([]); // Limpa os resultados se o termo de busca for muito curto
    }
  }, 300); // Aguarda 300ms antes de fazer a requisição

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setInputValue(searchValue);
    debouncedSearch(searchValue); // Chama a função de busca com debounce
  };

  const handleTorneioSelect = (torneio) => {
    setSelectedTorneio(torneio);
    setInputValue(torneio.nome); // Atualiza o campo de busca com o nome do torneio selecionado
    setSearchResults([]); // Limpa a lista de sugestões após a seleção
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTorneio) {
      alert("Por favor, selecione um torneio!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3004/partidas/${selectedTorneio._id}` //nao consegui enviar o token com redux
      );

      alert("Partidas geradas com sucesso!");
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
      alert("Erro ao gerar partidas");
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
            <div className="envio-convite-container1">
              <h2 className="nometor">digite o nome do torneio:</h2>
              <form className="envio-convite-form" onSubmit={handleSubmit}>
                <label>
                  nome do torneio:
                  <input
                    className="input"
                    type="text"
                    value={inputValue}
                    onChange={handleSearchChange}
                    placeholder="digite o nome do torneio"
                    required
                  />
                </label>

                {/* Exibir sugestões de torneios */}
                {searchResults.length > 0 && (
                  <ul className="search-results1">
                    {searchResults.map((torneio) => (
                      <li
                        key={torneio._id}
                        onClick={() => handleTorneioSelect(torneio)}
                        className="search-result-item"
                      >
                        {torneio.nomeTorneio}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Exibir torneio selecionado */}
                {selectedTorneio && (
                  <div>
                    <p>torneio selecionado: {selectedTorneio.nomeTorneio}</p>
                  </div>
                )}

                <button className="buttongerar" type="submit">
                  gerar partidas
                </button>
              </form>
            </div>
          </Modal>
        ) : (
          <button onClick={handleOpenModal} className="buttonconvite">
            gerar partidas
          </button>
        )}
      </div>
    </div>
  );
};

export default GerarPartida;
