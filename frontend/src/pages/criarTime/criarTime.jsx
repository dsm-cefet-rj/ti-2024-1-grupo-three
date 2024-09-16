import React, { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./criarTime.css";
import { v4 as idGen } from "uuid";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTime, addTimeAsync } from "../../redux/time/slice";
import { jwtDecode } from "jwt-decode";

/**
 * Componente CriarTime.
 *
 * Este componente permite que um usuário autenticado crie um novo time.
 * O usuário deve fornecer um nome de time e, ao enviar o formulário, o time é criado através de uma chamada à API.
 *
 * @component
 */
const CriarTime = () => {
  const token = useSelector((state) => state.auth.token); // Seleciona o token de autenticação do estado Redux
  const dispatch = useDispatch(); // Hook para despachar ações do Redux
  const [nomeTime, setNomeTime] = useState(""); // Estado para armazenar o nome do time
  const navigate = useNavigate(); // Hook para navegação de rotas
  const decodedToken = jwtDecode(token); // Decodifica o token JWT

  /**
   * Manipula a submissão do formulário para criar um novo time.
   * Faz uma chamada à API para criar um time com os dados fornecidos.
   *
   * @async
   * @function handleSubmitForm
   * @param {Object} e - O evento de submissão do formulário.
   */

  const body = {
    nomeTime: nomeTime,
    userIdDono: userIdDono,
    userId: userId,
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(addTimeAsync(body));
      if (addTimeAsync.fulfilled.match(response)) {
        setTimeout(() => {
          navigate("/time");
        }, 2000);
      } else {
        alert(`Erro: ${response.payload}`);
      }
    } catch (error) {
      console.error("Erro ao criar o time:", error);
      alert("Erro ao criar o time. Por favor, tente novamente.");
    }
  };

  /**
   * Manipula a mudança de input para o nome do time.
   *
   * @function handleChange
   * @param {Object} e - O evento de mudança de input.
   */
  function handleChange(e) {
    setNomeTime(e.target.value);
  }

  // Redireciona para a página de login se o token não estiver presente
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar />

      <form
        className="formCriarTime"
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
      >
        <div className="nomeCriarTime">
          <h1 className="nomedoTime">nome do time:</h1>
          <input
            type="text"
            className="inputCriarTime"
            onChange={handleChange}
          />
        </div>
        <div className="formCriarTime">
          <button className="botaoCriarTime" type="submit">
            criar um time
          </button>
        </div>
      </form>
    </div>
  );
};

export default CriarTime;
