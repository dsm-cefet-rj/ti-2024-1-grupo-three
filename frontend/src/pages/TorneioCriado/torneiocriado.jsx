import React from 'react';
import './torneiocriado.css';
import NavBar from "../../components/navBar/navBar";
const TorneioCriado = () => {
    const handleInviteClick = () => {
        alert('Convites enviados com sucesso!');
    };

    return (
        <><div>
            <NavBar />
        </div><div className="container">
                <div className="quadro">
                    <p className="mensagem">
                        Torneio criado com sucesso! Seu torneio está vazio, deseja convidar algum time para participar do torneio?
                    </p>
                </div>
                <div className="pesquisa">
                    <input type="text" id="nomeTime" placeholder="Pesquisar time" />
                </div>
                <buttonEnviar className="botaoEnviar" onClick={handleInviteClick}>
                    Convidar para Torneio
                </buttonEnviar>
            </div></>
    );
};

export default TorneioCriado;