import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTorneio, addTorneioAsync } from '../../redux/torneios/slice';
import { v4 as idGen } from "uuid";
import { useNavigate, Navigate } from "react-router-dom";
import "./criartorneio.css";
import axios from "axios";
import NavBar from "../../components/navBar/navBar";
import { jwtDecode } from "jwt-decode";

const TorneioForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(rootReducer => rootReducer.user);
  const [nomeTorneio, setNomeTorneio] = useState('');
  const [tipoTorneio, setTipoTorneio] = useState('Aberto');
  const [quantidadeTimes, setQuantidadeTimes] = useState('2');
  const[ localTorneio, setlocalTorneio] = useState('');
  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (!token) {
    return <Navigate to="/login" />;
  }
   const userIdDonoTorneio = decodedToken.id
  const handleSubmitForm = async (event) => {
    event.preventDefault();
  
    if (!nomeTorneio || !tipoTorneio || !quantidadeTimes || !localTorneio) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
   
    // const initialValues = {
    //   nomeTorneio: nomeTorneio,
    //   userIdDonoTorneio: decodedToken.id,  // Obtém o ID do token JWT decodificado
    //   tipoTorneio: tipoTorneio,
    //   qtdTimes: quantidadeTimes,
    //   localTorneio: localTorneio
    // };
    const qtdTimes = quantidadeTimes
    try {
      // Faz a requisição POST para o back-end
      const response = await fetch ('http://localhost:3004/api/torneio', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`, // Passa o token de autenticação
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nomeTorneio, userIdDonoTorneio,tipoTorneio, qtdTimes, localTorneio})
      });
  
      if (response.ok) { // Utiliza response.ok para checar se o status é 2xx
        alert('Torneio criado com sucesso!');
        navigate("/meustorneios"); // Redireciona para a página de sucesso
      } else {
        // Lê a resposta do servidor para mostrar detalhes sobre o erro
        const errorData = await response.json();
        console.error('Erro ao criar torneio:', errorData);
        alert(`Erro ao criar torneio: ${errorData.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao criar torneio:', error);
      alert('Erro ao criar torneio.');
    }
  };
  

//  if (!currentUser.logged) {
//    return <Navigate to="/login" />;
 // }

  return (
    <>
      <div>
        <NavBar />
      </div>
      <form className='torneiocriar' onSubmit={handleSubmitForm}>
        <div className="nomeTorneio">
          <label htmlFor="nomeTorneio">Nome do Torneio:</label>
          <input 
            className='input2702'
            type="text"
            id="nomeTorneio"
            value={nomeTorneio}
            onChange={(event) => setNomeTorneio(event.target.value)}
            required 
          />
        </div>
        <div className="LocalTorneio">
          <label htmlFor="localTorneio">Local do Torneio:</label>
          <input 
            className='input2902'
            type="text"
            id="localTorneio"
            value={localTorneio}
            onChange={(event) => setlocalTorneio(event.target.value)}
            required 
          />
        </div>
              
        <div className='baixo2'>
          <div className="tipoTorneio">
            <label htmlFor="tipoTorneio">Tipo de Torneio:</label>
            <select 
              className="form-select" 
              id="tipoTorneio" 
              value={tipoTorneio} 
              onChange={(event) => setTipoTorneio(event.target.value)} 
              required
            >
              <option value="aberto">Aberto</option>
              <option value="fechado">Fechado</option>
            </select>   
          </div>
                  
          <div className="qtdTimes">
            <label htmlFor="quantidadeTimes">Quantidade de Times:</label>
            <input 
              className='input2802'
              type="number"
              id="quantidadeTimes"
              value={quantidadeTimes}
              onChange={(event) => setQuantidadeTimes(event.target.value)}
              required
              min="2"
              max="100" 
            />   
          </div>
        </div>
            
        <div className="torneiocriar">
          <button className='buttonCriartorneio' type="submit">Criar Torneio</button>  
        </div>
              
      </form>
    </>
  );
}

export default TorneioForm;