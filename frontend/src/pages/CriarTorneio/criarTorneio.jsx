import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTorneio, addTorneioAsync } from '../../redux/torneios/slice';
import { v4 as idGen } from "uuid";
import { useNavigate, Navigate } from "react-router-dom";
import "./criartorneio.css";
import NavBar from "../../components/navBar/navBar";

const TorneioForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(rootReducer => rootReducer.user);
  const [nomeTorneio, setNomeTorneio] = useState('');
  const [tipoTorneio, setTipoTorneio] = useState('aberto');
  const [quantidadeTimes, setQuantidadeTimes] = useState('2');
  const[ localTorneio, setlocalTorneio] = useState('');

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (!nomeTorneio || !tipoTorneio || !quantidadeTimes || !localTorneio) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const initialValues = {
      nomeTorneio: nomeTorneio,
      userIdDonoTorneio: currentUser.user.id,
      tipoTorneio: tipoTorneio,
      qtdTimes: quantidadeTimes,
      localTorneio: localTorneio
    };

    try {
      const response = dispatch(addTorneioAsync({
        nomeTorneio: initialValues.nomeTorneio,
        userIdDonoTorneio: initialValues.userIdDonoTorneio,
        id: idGen(),
        qtdTimes: initialValues.qtdTimes,
        tipoTorneio: initialValues.tipoTorneio,
        localTorneio: initialValues.localTorneio
      }));
        navigate("/torneiocriado");
       
    } catch (error) {
      console.error('Erro ao criar torneio:', error);
      alert('Erro ao criar torneio.');
    }
  };

  if (!currentUser.logged) {
    return <Navigate to="/login" />;
  }

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
