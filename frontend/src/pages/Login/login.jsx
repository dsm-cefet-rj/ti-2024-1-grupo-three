import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLoggedUser } from "../../redux/user/slice";
import CreateAxiosInstance from "../../utils/api";
import "../Cadastro/cadastro.css";
import "../Login/login.css";

/**
 * Componente de Login.
 *
 * Este componente permite que um usuário faça login na aplicação.
 * Realiza uma chamada de API para autenticação e armazena o token no estado do Redux.
 *
 * @component
 */
const Login = () => {
  const [email, setUser] = useState(""); // Estado para o campo de email
  const [senha, setSenha] = useState(""); // Estado para o campo de senha
  const [error, setError] = useState(null); // Estado para mensagens de erro
  const [inputErrorUser, setInputErrorUser] = useState(false); // Estado para o erro de input de usuário
  const [inputErrorSenha, setInputErrorSenha] = useState(false); // Estado para o erro de input de senha
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para visibilidade da senha
  const navigate = useNavigate(); // Hook para navegação de rotas
  const dispatch = useDispatch(); // Hook para despachar ações do Redux
  const api = CreateAxiosInstance();

  /**
   * Manipula o evento de login.
   * Envia os dados do usuário para o endpoint de login da API.
   *
   * @async
   * @function handleLogin
   * @param {Object} e - O evento de submissão do formulário.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const body = {
        email: email,
        senha: senha,
      };
      console.log(body);
      const response = await api.post("/login", body);

      if (response.data.status == true) {
        dispatch(addLoggedUser(autenticado.data));
        alert("Autenticado com sucesso!");
        navigate("/Time");
      }
    } catch (error) {
      alert(error);
    }
  };

  /**
   * Manipula a mudança de input do usuário.
   *
   * @function handleChangeUser
   * @param {Object} e - O evento de mudança de input.
   */
  function handleChangeUser(e) {
    setUser(e.target.value);
  }

  /**
   * Manipula a mudança de input da senha.
   *
   * @function handleChangeSenha
   * @param {Object} e - O evento de mudança de input.
   */
  function handleChangeSenha(e) {
    setSenha(e.target.value);
  }

  /**
   * Manipula o evento de submissão do formulário.
   * Valida os inputs de email e senha.
   *
   * @function handleSubmit
   * @param {Object} e - O evento de submissão do formulário.
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) {
      if (!email.trim()) {
        setInputErrorUser(true);
      } else {
        setInputErrorUser(false);
      }
      if (!senha.trim()) {
        setInputErrorSenha(true);
      } else {
        setInputErrorSenha(false);
      }
      return;
    }
    email, senha;
  }

  /**
   * Alterna a visibilidade da senha.
   *
   * @function handleTogglePasswordVisibility
   */
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  /**
   * Manipula o evento de clique para a página de cadastro.
   *
   * @function handleClickCadastro
   * @param {Object} e - O evento de clique.
   */
  function handleClickCadastro(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="login-container">
      <div>
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <div className="box-login">
          <form className="form-login" onSubmit={handleLogin}>
            <h3>email:</h3>
            <input
              type="text"
              name="mensagem"
              value={email}
              onChange={handleChangeUser}
              required
              className={inputErrorUser ? "input-error" : "input-certo"}
            ></input>
            <h3>senha:</h3>
            <input
              type={passwordVisible ? "text" : "password"}
              name="mensagem"
              value={senha}
              onChange={handleChangeSenha}
              required
              className={inputErrorSenha ? "input-error" : "input-certo"}
            ></input>
            <div>
              <input
                type="checkbox"
                name="mostrar senha"
                checked={passwordVisible}
                onChange={handleTogglePasswordVisibility}
                className="checkbox-mostrar-senha"
                id="checkbox-senha"
              />
              <label
                htmlFor="checkbox-senha"
                className="btn-checkbox-personalizado"
              >
                mostrar senha
              </label>
            </div>
            <div className="botoes">
              <button type="submit" className="btn-login">
                logar
              </button>
              <p className="pergunta-login">quer criar uma conta?</p>
              <a
                className="entrar-cadastro-login"
                onClick={handleClickCadastro}
              >
                cadastrar
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
