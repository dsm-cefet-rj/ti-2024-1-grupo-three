import React from "react";
import Seta from "../../assets/Arrow 1.svg";
import "./meustorneioscomponent.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTorneioByUserIdDonoTorneio,
  getTorneio,
} from "../../redux/torneios/slice";
import { deleteUserFromTime } from "../../redux/time/slice";
import Delete from "../../assets/delete.svg";

const Torneiomjr = ({ id, nome, qtdtimes, tipoTorneio, local }) => {
  const navigate = useNavigate(); // Hook para navegação
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const timeDados = useSelector((rootReducer) => rootReducer.time);
  const dispatch = useDispatch();
  const Times = timeDados.timeUser.payload;


  const handleDeleteTorneio = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        deleteTorneioByUserIdDonoTorneio({
          userIdDonoTorneio: currentUser.user._id,
          token: currentUser.logged,
        })
      );
      if (result) {

        navigate("/Time"); //indo independente do resultado
      } else {
        alert("Você não é o dono desse torneio!");

        // Aqui você pode adicionar lógica adicional para lidar com o resultado
      }
    } catch (error) {
      console.error("Erro ao tentar deletar:", error);
      alert("Ocorreu um erro ao tentar deletar.");
    }
  };
  function handleClick() {
    navigate(`/mostrartorneio/${id}`);
  }
  return (
    <div className="TorneioContainer">
      <div className="dividir2">
        <div>
          <img
            src={Delete}
            onClick={handleDeleteTorneio}
            alt="menu"
            className="imagedelete2"
          />
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
