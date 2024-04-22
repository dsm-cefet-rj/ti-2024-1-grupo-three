import React, { useState } from 'react';
import "./criartorneio.css";
import NavBar from "../../components/navBar/navBar";
function TorneioForm() {
  const [nomeTorneio, setNomeTorneio] = useState('');
  const [tipoTorneio, setTipoTorneio] = useState('');
  const [quantidadeTimes, setQuantidadeTimes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nomeTorneio || !tipoTorneio || !quantidadeTimes) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    console.log('Nome do Torneio:', nomeTorneio);
    console.log('Tipo de Torneio:', tipoTorneio);
    console.log('Quantidade de Times:', quantidadeTimes);

    window.location.href = '/torneiocriado';
   
  };

  return (
    <><div>
          <NavBar />
      </div>
      <form className='torneiocriar' onSubmit={handleSubmit}>
        <div className="nomeTorneio">
         <label htmlFor="nomeTorneio">Nome do Torneio:</label>
              <input className='input2702'
                  type="text"
                  id="nomeTorneio"
                  value={nomeTorneio}
                  onChange={(event) => setNomeTorneio(event.target.value)}
                  required />   
        </div>
              
                <div className='baixo2'>
                    <div className="tipoTorneio">
                     <label htmlFor="tipoTorneio">Tipo de Torneio:</label>
              <select className="form-select" id="tipoTorneio" value={tipoTorneio} onChange={(event) => setTipoTorneio(event.target.value)} required>
                  <option value="aberto">Aberto</option>
                  <option value="fechado">Fechado</option>
              </select>   
                    </div>
                  
                <div className="qtdTimes">
                 <label htmlFor="quantidadeTimes">Quantidade de Times:</label>
              <input className='input2802'
                  type="number"
                  id="quantidadeTimes"
                  value={quantidadeTimes}
                  onChange={(event) => setQuantidadeTimes(event.target.value)}
                  required
                  min="2"
                  max="100" />   
                </div>
                
                </div>
            
                <div className="torneiocriar">
                  <button className='buttonCriartorneio' type="submit">Criar Torneio</button>  
                </div>
              
          </form></>
  );
}

export default TorneioForm;