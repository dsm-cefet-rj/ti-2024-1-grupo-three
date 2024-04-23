import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/user/slice";
import { v4 as idGen } from "uuid";
import { addLoggedUser, logoutUser } from "../../redux/user/slice";
import axios from "axios";
import "../Cadastro/cadastro.css";
import "../Login/login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [submitUser, setSubmitUser] = useState("");
  const [inputErrorUser, setInputErrorUser] = useState(false);
  const [inputErrorSenha, setInputErrorSenha] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitSenha, setSubmitSenha] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function Autentica(info) {
    const response = await axios.get("http://localhost:3004/users");
    const users = response.data;

    for (let user of users) {
      if (user.user === info.user && user.senha === info.senha) {
        dispatch(addLoggedUser(user));
        //  dispatch(getTimesByUserID(user.id));
        //  dispatch(getPartidasByUserID(user.id));
        alert("autenticado");
        navigate("/time");
        return;
      }
    }
    alert("usuario invalido");
  }
  function handleChangeUser(e) {
    setUser(e.target.value);
  }
  function handleChangeSenha(e) {
    setSenha(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!user.trim() || !senha.trim()) {
      if (!user.trim()) {
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
    setSubmitUser(user);
    setSubmitSenha(senha);
  }
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="login-container">
      <div>
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <div className="box-login">
          <form
            // onSubmit={handleSubmit}
            onSubmit={(values) => {
              handleSubmit(values);
              Autentica(values);
            }}
          >
            <h3>Usuario:</h3>
            <input
              type="text"
              name="mensagem"
              value={user}
              onChange={handleChangeUser}
              className={inputErrorUser ? "input-error" : "input-certo"}
            ></input>
            <h3>Senha:</h3>
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
            <button type="submit" className="btn-login">
              Logar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
