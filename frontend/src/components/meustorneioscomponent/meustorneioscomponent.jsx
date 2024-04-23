import React from "react";
import "./meustorneioscomponent.css";

function Torneiomjr({ id, nome, qtdPartidas, tipoTorneio, local }) {
    return (
        <div className="TorneioContainer">
            <div className="dividir2">
                <div className="TORNEIOSS">
                    <div className="torneioNome">
                        <h1 className="nomeCamp">{nome}</h1>
                    </div>
                    <div className="dividir1">
                        <div className="infos1">
                            <h2>{qtdPartidas}</h2>
                            <h2>{tipoTorneio}</h2>
                        </div>
                        <div className="">
                            <h2>{local}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
export default Torneiomjr;
