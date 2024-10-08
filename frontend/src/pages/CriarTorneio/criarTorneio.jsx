import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTorneio, addTorneioAsync } from "../../redux/torneios/slice";
import { useNavigate, Navigate } from "react-router-dom";
import "./criartorneio.css";
import NavBar from "../../components/navBar/navBar";


/**
 * Componente TorneioForm.
 *
 * Este componente permite que o usuário crie um novo torneio.
 * O usuário deve fornecer um nome de torneio, a quantidade de times e o local do torneio.
 * Os dados são enviados para o back-end para criar o torneio.
 *
 * @component
 */
const TorneioForm = () => {
  const dispatch = useDispatch(); // Hook para despachar ações do Redux
  const navigate = useNavigate(); // Hook para navegação de rotas
  const currentUser = useSelector((rootReducer) => rootReducer.user); // Seleciona o usuário atual do estado Redux
  const [nomeTorneio, setNomeTorneio] = useState(""); // Estado para armazenar o nome do torneio
  const [quantidadeTimes, setQuantidadeTimes] = useState("2"); // Estado para armazenar a quantidade de times
  const [localTorneio, setlocalTorneio] = useState(""); // Estado para armazenar o local do torneio


  // Redireciona para a página de login se o token não estiver presente
  if (!currentUser.logged) {
    return <Navigate to="/login" />;
  }

  const body = {
    nomeTorneio: nomeTorneio,
    userIdDonoTorneio: currentUser.user._id,
    qtdTimes: quantidadeTimes,
    localTorneio: localTorneio,
  }
  /**
   * Manipula a submissão do formulário para criar um novo torneio.
   * Faz uma chamada à API para criar um torneio com os dados fornecidos.
   *
   * @async
   * @function handleSubmitForm
   * @param {Object} event - O evento de submissão do formulário.
   */
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (!nomeTorneio || !quantidadeTimes || !localTorneio) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const qtdTimes = quantidadeTimes;

    try {
      // Faz a requisição POST para o back-end
      const response = await dispatch(addTorneioAsync(body));
      if (addTorneioAsync.fulfilled.match(response)) {
        setTimeout(() => {
          navigate("/meustorneios");
        }, 2000);
      } else {
        alert(`Erro: ${response.payload}`);
      }
    } catch (error) {
      console.error("Erro ao criar torneio:", error);
      alert("Erro ao criar torneio.");
    }
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <form className="torneiocriar" onSubmit={handleSubmitForm}>
        <div className="nomeTorneio">
          <label htmlFor="nomeTorneio">nome do torneio:</label>
          <input
            className="input2702"
            type="text"
            id="nomeTorneio"
            value={nomeTorneio}
            onChange={(event) => setNomeTorneio(event.target.value)}
            required
          />
        </div>
        <div className="LocalTorneio">
          <label htmlFor="localTorneio">local do torneio:</label>
          <input
            className="input2902"
            type="text"
            id="localTorneio"
            value={localTorneio}
            onChange={(event) => setlocalTorneio(event.target.value)}
            required
          />
        </div>

        <div className="baixo2">
          <div className="qtdTimes">
            <label htmlFor="quantidadeTimes">quantidade de times:</label>
            <input
              className="input2802"
              type="number"
              id="quantidadeTimes"
              value={quantidadeTimes}
              onChange={(event) => {
                setQuantidadeTimes(event.target.value);
              }}
              onBlur={(event) => {
                const value = parseInt(event.target.value, 10);
                // Verificar se o valor é um número válido e está dentro do intervalo
                if (!isNaN(value) && value >= 2 && value <= 100) {
                  // Verificar se o número é par
                  if (value % 2 === 0) {
                    setQuantidadeTimes(value); // Atualiza o estado apenas se for par
                  } else {
                    // Ajusta para o próximo número par inferior
                    setQuantidadeTimes(value - 1);
                  }
                } else {
                  setQuantidadeTimes(""); // Reseta se o valor for inválido
                }
              }}
            />
          </div>
        </div>

        <div className="torneiocriar">
          <button className="buttonCriartorneio" type="submit">
            criar torneio
          </button>
        </div>
      </form>
    </>
  );
};

export default TorneioForm;
