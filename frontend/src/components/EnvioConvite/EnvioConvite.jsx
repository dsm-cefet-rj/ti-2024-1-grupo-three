import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enviarConviteAsync } from "../../redux/convite/slice";
import axios from "axios";
import "../EnvioConvite/EnvioConvite.css";
import { debounce } from "lodash"; // Importa o debounce do lodash
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

const EnvioConvite = () => {
  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Armazena os resultados da busca
  const [selectedUser, setSelectedUser] = useState(null); // Armazena o usuário selecionado
  const loggedUser = useSelector((state) => state.user.loggedUser); // Usuário logado
  const dispatch = useDispatch();

  const [mensagemAviso, setMensagemAviso] = useState("");

  const [tipoConvite, setTipoConvite] = useState('Jogador');
  const[ tipoConviteEnvio, setTipoConviteEnvio] = useState('');
  const[ usuarioRemetenteId, setUsuarioRemetenteId] = useState('');
  const[ usuarioDestinatarioId, setUsuarioDestinatarioId] = useState('');
  const[ timeId, setTimeId] = useState('');
  const[ torneio, setTorneio] = useState('');
  



  // Função com debounce para limitar as chamadas da API
  const debouncedSearch = debounce(async (searchValue) => {
    if (searchValue.length > 1) { // Busca apenas se houver mais de 2 caracteres
      if (tipoConvite == 'Jogador'){
        try {
          const response = await axios.get(
            `http://localhost:3004/api/user?nome_like=${searchValue}`
          );
          console.log(tipoConvite);
          setSearchResults(response.data);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      }else{

        const response = await axios.get(
          `http://localhost:3004/api/time?nome_like=${searchValue}`
        );
        console.log(tipoConvite);
        console.log(response.data)
        setSearchResults(response.data);
      }
      
    } else {
      setSearchResults([]); // Limpa os resultados se o termo de busca for muito curto
    }
  }, 300); // Aguarda 300ms antes de fazer a requisição

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let timeDoUsuario = []
    let torneioUsuario = []
    let convites = []
    let remetenteUnico = true;
    if (tipoConvite == `Jogador`) {
      if(selectedUser){
        const responseVerificacao = await axios.get(`http://localhost:3004/api/time/user/${selectedUser._id}`)
        if(responseVerificacao.data){
          timeDoUsuario = responseVerificacao.data
        }
        const responseVerificacaoConvite = await axios.get(`http://localhost:3004/api/convite/destinatario/${selectedUser._id}`)
        if(responseVerificacaoConvite && responseVerificacaoConvite.data.length > 0){
          convites = responseVerificacaoConvite.data
          convites.forEach((convite) => {
            if (convite.usuarioRemetente === userId) {
              remetenteUnico = false;
            }
          });
        }
        if(!remetenteUnico){
          setMensagemAviso(`Usuário já possui convite!`)
        }else{
          if(Array.isArray(timeDoUsuario)){
            setMensagemAviso(`Usuário já possui um time!`)
          }else{
            setTipoConviteEnvio("usuario_para_usuario")
            setUsuarioRemetenteId(userId)
            setUsuarioDestinatarioId(selectedUser._id)
            const response = await fetch("http://localhost:3004/api/convite", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ tipoConviteEnvio, usuarioRemetenteId, usuarioDestinatarioId, timeId, torneio}),
            });
            setMensagemAviso(`Convite enviado com sucesso!`)
          }
        }
        
        
      }
      else{
        setMensagemAviso(`Usuário não selecionado!`)
      }
    }else{
      
      if(selectedUser){
        const responseDono = await axios.get(`http://localhost:3004/api/torneio/dono/${selectedUser._id}`)
        torneioUsuario = responseDono.data
        if(!Array.isArray(timeDoUsuario)){
          setTipoConviteEnvio("torneio_para_time")
          setUsuarioRemetenteId(userId)
          setTimeId(selectedUser._id)
          setTorneio(torneioUsuario._id)
          const response = await fetch("http://localhost:3004/api/convite", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tipoConviteEnvio, usuarioRemetenteId, usuarioDestinatarioId, timeId, torneio}),
          });
          setMensagemAviso(`Convite enviado com sucesso!`)
        }else{
          setMensagemAviso(`Você não é dono de nenhum torneio!`)
        }
        
      }else{
        setMensagemAviso(`Time não selecionado`)
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
            <h2>Enviar Convite</h2>
            <form onSubmit={handleSubmit} className="envio-convite-form">
              <div className="tipoConvite">
                <label htmlFor="tipoConvite">Você quer convidar:</label>
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
                <label htmlFor="searchUser">{tipoConvite === 'Jogador' ? "Nome do usuário" : "Nome do time"}</label>
                <input
                  className="caixa-destinatario"
                  type="text"
                  id="searchUser"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder={tipoConvite === 'Jogador' ? "Digite o nome do usuário" : "Digite o nome do time"}
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
                        {tipoConvite == "Jogador" ? user.nome : user.nomeTime}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedUser && (
                <div>
                  <p>{tipoConvite === 'Jogador' ? `Usuário selecionado: ${selectedUser.nome}` : `Time selecionado: ${selectedUser.nomeTime}`}</p>
                </div>
              )}
              <div>
                <p>{mensagemAviso}</p>
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
