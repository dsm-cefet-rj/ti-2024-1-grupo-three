import { React, useState, useEffect } from "react";

import NavBar from "../../components/navBar/navBar";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "../Usuario/Usuario.css";
import axios from "axios";

import { updateUser, deleteUser } from "../../redux/user/slice";

const Usuario = () => {
  const [usuario, setUsuario] = useState([]);
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

  const currentUser = useSelector((rootReducer) => rootReducer.user);
  // Redireciona para a página de login se o token não estiver presente
  if (!currentUser.logged) {
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

  const handleDelete = (e) => {
    e.preventDefault();
    const userId = currentUser.user._id;
    dispatch(
      deleteUser({
        id: userId,
        token: currentUser.logged,
      })
    );
    navigate(`/`);
  };

  const handleSubmitForm = (e) => {
    dispatch(
      updateUser({
        senha: newPassword,
        token: currentUser.logged,
        _id: currentUser.user._id,
      })
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUsuario(currentUser.user);
      } catch (error) {
        console.error("Erro ao buscar o nome do usuário:", error);
      }
    };
    fetchUser();
  }, [currentUser.logged]);

  return (
    <div className="pagina">
      <NavBar />
      <div className="titulos">
        <h1 className="titulo">{currentUser.user.nome}</h1>
        <h1 className="titulo">{currentUser.user.email}</h1>
      </div>
      <div>
        <h1 className="senhatit">mudar senha</h1>
      </div>
      <div className="box-senha">
        <form onSubmit={handleSubmitForm} className="form-senhas">
          {/* <div>
            <label className="labelsenha">senha atual:</label>
            <input
              type="password"
              className="inputsenha"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div> */}

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
