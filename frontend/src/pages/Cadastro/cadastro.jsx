import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/user/slice";
import "../Cadastro/cadastro.css";

/**
 * Componente Cadastro.
 *
 * Este componente permite que um novo usuário se cadastre na aplicação.
 * Ele solicita o nome de usuário, email e senha e faz uma chamada à API para registrar o usuário.
 *
 * @component
 */
const Cadastro = () => {
  const [nome, setUser] = useState(""); // Estado para armazenar o nome do usuário
  const [email, setEmail] = useState(""); // Estado para armazenar o email do usuário
  const [senha, setSenha] = useState(""); // Estado para armazenar a senha do usuário
  const [inputErrorUser, setInputErrorUser] = useState(false); // Estado para o erro de input de usuário
  const [inputErrorEmail, setInputErrorEmail] = useState(false); // Estado para o erro de input de email
  const [inputErrorSenha, setInputErrorSenha] = useState(false); // Estado para o erro de input de senha
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controle da visibilidade da senha
  const navigate = useNavigate(); // Hook para navegação de rotas
  const dispatch = useDispatch(); // Hook para despachar ações do Redux

  /**
   * Alterna a visibilidade da senha.
   *
   * @function handleTogglePasswordVisibility
   */
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  /**
   * Manipula a mudança de input para o nome de usuário.
   *
   * @function handleChangeUser
   * @param {Object} e - O evento de mudança de input.
   */
  function handleChangeUser(e) {
    setUser(e.target.value);
  }

  /**
   * Manipula a mudança de input para a senha.
   *
   * @function handleChangeSenha
   * @param {Object} e - O evento de mudança de input.
   */
  function handleChangeSenha(e) {
    setSenha(e.target.value);
  }

  /**
   * Manipula a mudança de input para o email.
   *
   * @function handleChangeEmail
   * @param {Object} e - O evento de mudança de input.
   */
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  /**
   * Manipula a submissão do formulário de cadastro.
   * Faz uma chamada à API para registrar um novo usuário.
   *
   * @async
   * @function handleSubmit
   * @param {Object} e - O evento de submissão do formulário.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      if (!nome.trim()) {
        setInputErrorUser(true);
      } else {
        setInputErrorUser(false);
      }
      if (!email.trim()) {
        setInputErrorEmail(true);
      } else {
        setInputErrorEmail(false);
      }
      if (!senha.trim()) {
        setInputErrorSenha(true);
      } else {
        setInputErrorSenha(false);
      }

      return;
    }
    setInputErrorSenha(false);
    setInputErrorEmail(false);
    setInputErrorUser(false);
    const body = {
      nome: nome,
      email: email,
      senha: senha }
    try {
      const response = await dispatch(addUser(body));

      if (addUser.fulfilled.match(response)) {
        setTimeout(() => {
          navigate("/login");
      }, 2000);
      } else {
        alert(`Erro: ${response.payload}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Manipula o clique do link de login.
   * Redireciona o usuário para a página de login.
   *
   * @function handleClickLogin
   * @param {Object} e - O evento de clique.
   */
  function handleClickLogin(e) {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className="cadastro-container">
      <div>
        <div className="cadastro-header">
          <h1>cadastro</h1>
        </div>
        <div className="box-cadastro">
          <form onSubmit={handleSubmit} className="form-cadastro">
            <div>
              <div>
                <h3>seu email:</h3>
                <input
                  type="text"
                  name="mensagem"
                  value={email}
                  onChange={handleChangeEmail}
                  className={inputErrorEmail ? "input-error" : "input-certo"}
                ></input>
              </div>
              <div>
                <h3>seu usuario:</h3>
                <input
                  type="text"
                  name="mensagem"
                  value={nome}
                  onChange={handleChangeUser}
                  className={inputErrorUser ? "input-error" : "input-certo"}
                ></input>
              </div>
              <div>
                <h3>sua senha:</h3>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="mensagem"
                  value={senha}
                  onChange={handleChangeSenha}
                  className={inputErrorSenha ? "input-error" : "input-certo"}
                ></input>
                <br />
              </div>
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
            </div>
            <button type="submit" className="btn-cadastro">
              cadastrar
            </button>
            <p className="pergunta-cadastro">já tem uma conta?</p>
            <a className="entrar-login-cadastro" onClick={handleClickLogin}>
              entrar
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
