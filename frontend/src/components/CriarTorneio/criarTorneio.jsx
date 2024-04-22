import React, { useState } from 'react';
import "../CriarTorneio/criartorneio.css";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="nomeTorneio">Nome do Torneio:</label>
      <input
        type="text"
        id="nomeTorneio"
        value={nomeTorneio}
        onChange={(event) => setNomeTorneio(event.target.value)}
        required
      />

      <label htmlFor="tipoTorneio">Tipo de Torneio:</label>
      <input
        type="text"
        id="tipoTorneio"
        value={tipoTorneio}
        onChange={(event) => setTipoTorneio(event.target.value)}
        required
      />

      <label htmlFor="quantidadeTimes">Quantidade de Times:</label>
      <input
        type="number"
        id="quantidadeTimes"
        value={quantidadeTimes}
        onChange={(event) => setQuantidadeTimes(event.target.value)}
        required
      />

      <button type="submit">Criar Torneio</button>
    </form>
  );
}

export default TorneioForm;