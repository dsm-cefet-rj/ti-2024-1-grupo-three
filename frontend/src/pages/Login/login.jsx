import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, addLoggedUser, logoutUser } from "../../redux/user/slice";
import { v4 as idGen } from "uuid";
import axios from "axios";
import "../Cadastro/cadastro.css";
import "../Login/login.css";
import { setToken } from "../../redux/authSlice.js";

const Login = () => {
  const [email, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [inputErrorUser, setInputErrorUser] = useState(false);
  const [inputErrorSenha, setInputErrorSenha] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:3004/auth/login", {
        email,
        senha,
      });

      // Armazena o token no Redux ou localStorage
      dispatch(setToken(response.data.token));
      dispatch(addLoggedUser(response.data.user));

      const data = response.data;

      if (response.status === 200) {
        alert("Autenticado com sucesso!");
        navigate("/Time");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.msg);
      } else {
        setError("Erro no servidor. Tente novamente mais tarde.");
      }
    }
  };
  // async function Autentica(submitUser, submitSenha) {
  //   try {
  //     const response = await fetch("http://localhost:3004/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ submitUser, submitSenha }),
  //     });

  //     const data = response.data;

  //     if (response.status === 200) {
  //       alert("Autenticado com sucesso!");
  //       navigate("/Time");
  //     }
  //   } catch (error) {
  //     console.error("Erro durante a autenticação", error);
  //     alert("Usuário ou senha inválidos!");
  //   }
  // }

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
    email, senha;
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
