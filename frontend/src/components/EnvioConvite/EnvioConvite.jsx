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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Armazena os resultados da busca
  const [selectedUser, setSelectedUser] = useState(null); // Armazena o usuário selecionado
  const loggedUser = useSelector((state) => state.user.loggedUser); // Usuário logado
  const dispatch = useDispatch();
  const [idTimeConvite, setIdTimeConvite] = useState("");
  const [idCriadorConvite, setIdCriadorConvite] = useState("");

  useEffect(() => {
    if (loggedUser) {
      buscarInformacoesUsuario(loggedUser._id);
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

  const handleSearchChange = async (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  
    if (searchValue.length > 2) { // Busca apenas se houver mais de 2 caracteres
      try {
        const response = await axios.get(
          `http://localhost:3004/user?nome_like=${searchValue}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    } else {
      setSearchResults([]); // Limpa os resultados se o termo de busca for muito curto
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearchTerm(user.nome); // Atualiza o campo de busca com o nome do usuário selecionado
    setSearchResults([]); // Limpa a lista de sugestões após a seleção
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!idTimeConvite || !idCriadorConvite || !selectedUser) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    const convite = {
      idTimeConvite,
      idCriadorConvite,
      idDestinatario: selectedUser.id, // Usar o ID do usuário selecionado
    };

    dispatch(enviarConviteAsync(convite));
    setSelectedUser(null);
    setSearchTerm("");
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
              <div className="tipoTorneio">
                <label htmlFor="tipoTorneio">Você quer convidar:</label>
                <select className="form-select" id="tipoTorneio" required>
                  <option value="Jogador">Jogador</option>
                  <option value="Time">Time</option>
                </select>
              </div>
              <div>
                <label htmlFor="searchUser">Nome do destinatário:</label>
                <input
                  className="caixa-destinatario"
                  type="text"
                  id="searchUser"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Digite o nome do usuário"
                  required
                />
                {/* Exibir sugestões de usuários */}
                {searchResults.length > 0 && (
                  <ul className="search-results">
                    {searchResults.map((user) => (
                      <li
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        className="search-result-item"
                      >
                        {user.nome}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedUser && (
                <div>
                  <p>Usuário selecionado: {selectedUser.nome}</p>
                </div>
              )}
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
