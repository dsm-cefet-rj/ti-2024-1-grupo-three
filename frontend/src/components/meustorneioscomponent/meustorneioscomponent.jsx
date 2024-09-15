import React from "react";
import Seta from "../../assets/Arrow 1.svg";
import "./meustorneioscomponent.css";
import { useNavigate, Navigate } from "react-router-dom";
import Delete from "../../assets/delete.svg";

const Torneiomjr = ({ id, nome, qtdtimes, tipoTorneio, local }) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/mostrartorneio/${id}`);
  }
  return (
    <div className="TorneioContainer">
      <div className="dividir2">
        <div>
          <img src={Delete} alt="menu" className="imagedelete2" />
        </div>
        <div className="TORNEIOSS">
          <div className="torneioNome">
            <h1 className="nomeCamp">{nome}</h1>
          </div>
          <div className="dividir1">
            <div className="infos1">
              <h2>{qtdtimes}</h2>
              <h2>{tipoTorneio}</h2>
            </div>
            <div className="infos2">
              <h2>{local}</h2>
            </div>
          </div>
        </div>
        <div>
          <button className="setaButton" onClick={handleClick}>
            <img src={Seta} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Torneiomjr;
