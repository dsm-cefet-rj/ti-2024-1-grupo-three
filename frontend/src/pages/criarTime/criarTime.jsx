import React, { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./criarTime.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTime, addTimeAsync } from "../../redux/time/slice";
import { getTimeByUserId } from "../../redux/time/slice";
import { getPartidasIdTime, addPartidas } from "../../redux/partida/slice";

/**
 * Componente CriarTime.
 *
 * Este componente permite que um usuário autenticado crie um novo time.
 * O usuário deve fornecer um nome de time e, ao enviar o formulário, o time é criado através de uma chamada à API.
 *
 * @component
 */
const CriarTime = () => {
  const dispatch = useDispatch(); // Hook para despachar ações do Redux
  const [nomeTime, setNomeTime] = useState(""); // Estado para armazenar o nome do time
  const navigate = useNavigate(); // Hook para navegação de rotas
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  let suco;
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
    userIdDono: currentUser.user._id,
    userId: currentUser.user._id,
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(addTimeAsync(body));
      if (addTimeAsync.fulfilled.match(response)) {
        suco = currentUser;
        fetchTime();
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
  const fetchTime = async () => {
    try {
      const response = await dispatch(
        getTimeByUserId({
          userId: suco.user._id,
          token: suco.logged,
        })
      );
      if (response) {
        dispatch(addTime(response));
        //addJogadores
      }
      const partidaResponse = await dispatch(
        getPartidasIdTime({
          idTime: response.payload._id,
          token: suco.logged,
        })
      );


      if (partidaResponse) {
        dispatch(addPartidas(partidaResponse.payload)); // esta vindo com formato certo
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do time:", error);
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
  if (!currentUser.logged) {
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
