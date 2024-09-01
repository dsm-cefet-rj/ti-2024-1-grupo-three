import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, addLoggedUser, logoutUser } from "../../redux/user/slice";
import { v4 as idGen } from "uuid";
import axios from "axios";
import "../Cadastro/cadastro.css";
import "../Login/login.css";

const Login = () => {
  const [email, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [inputErrorUser, setInputErrorUser] = useState(false);
  const [inputErrorSenha, setInputErrorSenha] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function Autentica(submitUser, submitSenha) {
    try {
      const response = await axios.post("http://localhost:3004/auth/login", {
        email: submitUser,
        senha: submitSenha,
      });

      const data = response.data;

      // Se a autenticação for bem-sucedida, você pode armazenar o token JWT
      if (response.status === 200) {
        alert("Autenticado com sucesso!");
        // Armazene o token JWT (por exemplo, no localStorage)
        localStorage.setItem("token", data.token);

        // Despachar usuário logado para o Redux, se necessário
        dispatch(addLoggedUser(data.email));

        // Navegar para a página do Time
        navigate("/Time");
      }
    } catch (error) {
      console.error("Erro durante a autenticação", error);
      alert("Usuário ou senha inválidos!");
    }
  }

  function handleChangeUser(e) {
    setUser(e.target.value);
  }

  function handleChangeSenha(e) {
    setSenha(e.target.value);
  }

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
    Autentica(email, senha);
  }

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
          <form className="form-login" onSubmit={handleSubmit}>
            <h3>usuario:</h3>
            <input
              type="text"
              name="mensagem"
              value={email}
              onChange={handleChangeUser}
              className={inputErrorUser ? "input-error" : "input-certo"}
            ></input>
            <h3>senha:</h3>
            <input
              type={passwordVisible ? "text" : "password"}
              name="mensagem"
              value={senha}
              onChange={handleChangeSenha}
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
