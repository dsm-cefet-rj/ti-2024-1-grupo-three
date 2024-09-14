import { React, useState, useEffect } from "react";
import Button from "../../components/button/button";
import NavBar from "../../components/navBar/navBar";
import PartidaComponente from "../../components/partidaComponent/partidaComponente";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "../Usuario/Usuario.css";
import axios from "axios";
import Jogador from "../../components/jogador/jogador";
import { jwtDecode } from "jwt-decode";

const Usuario = () => {
  const [usuario, setUsuario] = useState([]);
  const token = useSelector((state) => state.auth.token); // Seleciona o token de autenticação do estado Redux
  const decodedToken = jwtDecode(token); // Decodifica o token JWT

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [inputErrorUser, setInputErrorUser] = useState(false); // Estado para o erro de input de usuário
  const [inputErrorEmail, setInputErrorEmail] = useState(false); // Estado para o erro de input de email
  const [inputErrorSenha, setInputErrorSenha] = useState(false); // Estado para o erro de input de senha
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controle da visibilidade da senha
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Hook para navegação de rotas
  const dispatch = useDispatch(); // Hook para despachar ações do Redux

  // Redireciona para a página de login se o token não estiver presente
  if (!token) {
    return <Navigate to="/login" />;
  }

  /**
   * Alterna a visibilidade da senha.
   *
   * @function handleTogglePasswordVisibility
   */
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    //apagar>? sla
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      setInputErrorSenha(true);
    } else {
      setInputErrorSenha(false);
    }

    setInputErrorSenha(false);
    setInputErrorEmail(false);
    setInputErrorUser(false);
    //chat sugeriu essa rota com checagens no backend
    try {
      const response = await axios.post("/api/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setSuccessMessage("Senha alterada com sucesso.");
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Erro ao alterar senha.");
    }

    // try {
    //   const response = await fetch("rota de update user", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ nome, email, senha }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     alert("Senha atualizada com sucesso!");
    //   } else {
    //     alert(`Erro: ${data.error}`);
    //   }
    // }  catch (error) {
    //       console.error("Erro ao mudar a senha:", error);
    //       alert("Erro ao mudar a senha. Por favor, tente novamente.");
    //     }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:3004/api/user/${decodedToken.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho
            },
          }
        );

        setUsuario(userResponse.data);
      } catch (error) {
        console.error("Erro ao buscar o nome do usuário:", error);
      }
    };
    fetchUser();
  }, [decodedToken.id]);

  return (
    <div className="pagina">
      <NavBar />
      <div className="titulos">
        <h1 className="titulo">{usuario.nome}</h1>
        <h1 className="titulo">{usuario.email}</h1>
      </div>
      <div>
        <h1 className="senhatit">mudar senha</h1>
      </div>
      <div className="box-senha">
        <form onSubmit={handleSubmit} className="form-senhas">
          <div>
            <label className="labelsenha">senha atual:</label>
            <input
              type="password"
              className="inputsenha"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="labelsenha">nova senha:</label>
            <input
              type="password"
              className="inputsenha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-novasenha">
            atualizar senha
          </button>
        </form>
      </div>
      <div className="delete">
        <div>
          <h1>deletar usuário</h1>
        </div>
        <div>
          <form onSubmit={handleDelete}>
            <button type="submit" className="btn-deletar">
              apagar conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Usuario;
