import React from "react";
import Seta from "../../assets/Arrow 1.svg"
import "./partidaComponente.css"

/**
 * Componente PartidaComponente.
 *
 * Este componente exibe informações sobre uma partida, incluindo o nome do adversário, o resultado, a data e o local.
 *
 * @component
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.id - O identificador da partida.
 * @param {string} props.nome - O nome do adversário ou do jogo.
 * @param {string} props.resultado - O resultado da partida.
 * @param {string} props.data - A data em que a partida aconteceu ou vai acontecer.
 * @param {string} props.local - O local onde a partida aconteceu ou vai acontecer.
 * @returns {JSX.Element} Retorna o JSX que renderiza o componente de partida.
 */
function PartidaComponente({ id, nome, resultado, data, local }) {
  return (
    <div className="partidaContainer">
        <div className="divisao2">
            <div className="partidas">
                <div className="partidaNome">
                    <h1 className="nometime">{nome}</h1>
                </div>
                <div className="divisao">
                    <div className="infos">
                        <h2>{resultado}</h2>
                        <h2>{local}</h2>
                    </div>
                    <div className="">
                        <h2>{data}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
export default PartidaComponente;