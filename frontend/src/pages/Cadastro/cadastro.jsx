import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/user/slice";
import { v4 as idGen } from "uuid";
import "../Cadastro/cadastro.css";

const Cadastro = () => {
  const [nome, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [inputErrorUser, setInputErrorUser] = useState(false);
  const [inputErrorEmail, setInputErrorEmail] = useState(false);
  const [inputErrorSenha, setInputErrorSenha] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  function handleChangeUser(e) {
    setUser(e.target.value);
  }
  function handleChangeSenha(e) {
    setSenha(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  const handleSubmit = async (e) => {
    console.log(e);
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
    try {
      const response = await fetch("http://localhost:3004/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
    }
    navigate("/login");
  };

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
                <p className="condicao-senha">
                  sua senha deve conter pelo menos 8 caracteres, uma
                  <br /> letra maiúscula e um número
                </p>
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
