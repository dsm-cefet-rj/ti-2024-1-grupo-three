import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../EnvioConvite/EnvioConvite.css";
import { debounce } from "lodash"; // Importa o debounce do lodash
import { getTimeByUserId } from "../../redux/time/slice";
import { searchUserAsync } from "../../redux/user/slice";
import { searchTimeAsync } from "../../redux/time/slice";
import { verificarConviteExistente } from "../../redux/convite/slice";
import { addCoviteAsync } from "../../redux/convite/slice";
import { jwtDecode } from "jwt-decode";
import { getTorneioByUserIdDonoTorneio } from "../../redux/torneios/slice";
//So pra mudar o outro commit

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="modal-container2">
        <div className="modal2">
          <button className="fechar2" onClick={onClose}>
            x
          </button>
          <div className="modal-content2">
            <p> {children} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnvioConvite = () => {
  const currentUser = useSelector((rootReducer) => rootReducer.user); // Usuário logado
    const userId = currentUser.user._id
  const token = currentUser.logged
  const timeDados = useSelector((rootReducer) => rootReducer.time);
   // Armazena os resultados da busca
  // Armazena o usuário selecionado
  const dispatch = useDispatch();

  const [tipoConvite, setTipoConvite] = useState("Jogador");
  const [mensagemAviso, setMensagemAviso] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tipoConviteEnvio, setTipoConviteEnvio] = useState("");
  const [usuarioRemetenteId, setUsuarioRemetenteId] = useState("");
  const [usuarioDestinatarioId, setUsuarioDestinatarioId] = useState("");
  const [timeId, setTimeId] = useState("");
  const [torneio, setTorneio] = useState("");
  

  // Função com debounce para limitar as chamadas da API
  const debouncedSearch = debounce(async (searchValue) => {
    if (searchValue.length > 2) {
      try {
        let response;
        
        // Verifica se o tipo de convite é "Jogador"
        if (tipoConvite === "Jogador") {
          // Executa a ação de busca de usuário
          response = await dispatch(searchUserAsync({ nome: searchValue }));
        } else {
          // Executa a ação de busca de time (presumindo que exista uma action searchTimeAsync)
          response = await dispatch(searchTimeAsync({ nome: searchValue }));
        }
  
        // Armazena o resultado da busca, acessando a propriedade 'payload'
        setSearchResults(response.payload);
        
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setSearchResults([]); // Limpa os resultados em caso de erro
      }
    } else {
      setSearchResults([]); // Limpa os resultados se o termo de busca for muito curto
    }
  }, 300);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    debouncedSearch(searchValue); // Chama a função de busca com debounce
  };
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setTipoConvite(selectedValue);
    setSelectedUser(null); // Limpa o usuário selecionado
    setSearchTerm(""); // Limpa o termo de busca
    setSearchResults([]); // Limpa os resultados de busca
  };
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearchTerm(user.nome); // Atualiza o campo de busca com o nome do usuário selecionado
    setSearchResults([]); // Limpa a lista de sugestões após a seleção
    if(tipoConvite == "Jogador"){
      setTipoConviteEnvio("usuario_para_usuario");
      setUsuarioRemetenteId(userId);
      setUsuarioDestinatarioId(user._id);   
    }else{
      setTipoConviteEnvio("torneio_para_time");
      setUsuarioRemetenteId(userId);
      setTimeId(user._id)
    }
    
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let timeDoUsuario = [];
    let torneioUsuario = [];
    let convites = [];
    let remetenteUnico = true;
    if (tipoConvite == `Jogador`) {
      if (selectedUser) {
        
        if ((selectedUser._id)) {
          timeDoUsuario = await dispatch(getTimeByUserId({userId:selectedUser._id}))
        }
        const responseConvite = await dispatch(
          verificarConviteExistente({
            destinatarioId: selectedUser._id,
            remetenteId: userId,
            token: token,
          })
        );
        if (responseConvite.payload) {
          setMensagemAviso(`Usuário já possui convite!`);
          return
        } else {
          if (!Array.isArray(timeDoUsuario.payload) && timeDoUsuario.payload) {
            setMensagemAviso(`Usuário já possui um time!`);
          } else {
            setTipoConviteEnvio("usuario_para_usuario");
            setUsuarioRemetenteId(userId);
            setUsuarioDestinatarioId(selectedUser._id);        
                console.log("tipo convite: %s",tipoConviteEnvio)
            const data = {}
            data.tipoConviteEnvio = tipoConviteEnvio;
            data.usuarioRemetenteId = usuarioRemetenteId;
            data.usuarioDestinatarioId = usuarioDestinatarioId;
            data.timeId = timeId;
            data.torneio = torneio;
            
            console.log("TOKEN: %s", token)
            console.log("DATA: %o", data)
            try{
              const response = await dispatch(addCoviteAsync({data: data, token:token}))
              if(response.payload){
                alert("Convite Enviado!");
              setMensagemAviso(`Convite enviado com sucesso!`);
              }
            }catch (error){
              console.error("Erro ao enviar o convite:", error);
              setMensagemAviso(`Erro ao enviar o convite!`);
            }
            
            
          }
        }
      } else {
        setMensagemAviso(`Usuário não selecionado!`);
      }
    } else {
      if (selectedUser) {
        const responseDono = await dispatch(getTorneioByUserIdDonoTorneio({userIdDono: userId, token: token}))
        torneioUsuario = responseDono.payload;

        if (torneioUsuario) {
          setTipoConviteEnvio("torneio_para_time");
          setUsuarioRemetenteId(userId);
          setTimeId(selectedUser._id);
          setTorneio(torneioUsuario._id);
          const data = {}
          data.tipoConviteEnvio = tipoConviteEnvio;
          data.usuarioRemetenteId = usuarioRemetenteId;
          data.usuarioDestinatarioId = usuarioDestinatarioId;
          data.timeId = timeId;
          data.torneio = torneio;
          try{
            const response = await dispatch(addCoviteAsync({data: data, token:token}))
            if(response.payload){
              alert("Convite Enviado!");
            setMensagemAviso(`Convite enviado com sucesso!`);
            }
          }catch (error){
            console.error("Erro ao enviar o convite:", error);
            setMensagemAviso(`Erro ao enviar o convite!`);
          }
          console.log(response.payload);
          if (response.status === 201) {
            alert("Convite Enviado!");
            setMensagemAviso(`Convite enviado com sucesso!`);
          } else {
            alert("Erro ao enviar convite!");
            setMensagemAviso(`Convite não enviado!`);
          }
        } else {
          setMensagemAviso(`Você não é dono de nenhum torneio!`);
        }
      } else {
        setMensagemAviso(`Time não selecionado`);
      }
    }

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
            <h2>enviar convite</h2>
            <form onSubmit={handleSubmit} className="envio-convite-form">
              <div className="tipoConvite">
                <label htmlFor="tipoConvite">você quer convidar:</label>
                <select
                  className="form-select"
                  id="tipoConvite"
                  value={tipoConvite}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="Jogador">Jogador</option>
                  <option value="Time">Time</option>
                </select>
              </div>
              <div>
                <label htmlFor="searchUser">
                  {tipoConvite === "Jogador"
                    ? "nome do usuário"
                    : "nome do time"}
                </label>
                <input
                  className="caixa-destinatario"
                  type="text"
                  id="searchUser"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder={
                    tipoConvite === "Jogador"
                      ? "digite o nome do usuário"
                      : "digite o nome do time"
                  }
                  required
                />
                {/* Exibir sugestões de usuários */}
                {searchResults.length > 0 && (
                  <ul className="search-results">
                    {searchResults.map((user) => (
                      <li
                        key={user._id}
                        onClick={() => handleUserSelect(user)}
                        className="search-result-item"
                      >
                        {tipoConvite == "Jogador" ? user.nome : user.nomeTime}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedUser && (
                <div>
                  <p>
                    {tipoConvite === "Jogador"
                      ? `Usuário selecionado: ${selectedUser.nome}`
                      : `Time selecionado: ${selectedUser.nomeTime}`}
                  </p>
                </div>
              )}
              <div>
                <p>{mensagemAviso}</p>
              </div>
              <button type="submit">enviar convite</button>
            </form>
          </div>
        </Modal>
      ) : (
        <button onClick={handleOpenModal} className="buttonconvite">
          enviar convites
        </button>
      )}
    </div>
  );
};

export default EnvioConvite;
