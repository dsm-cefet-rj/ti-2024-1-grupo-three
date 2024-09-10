import React from "react";
import Seta from "../../assets/Arrow 1.svg"
import "./partidaComponente.css"

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