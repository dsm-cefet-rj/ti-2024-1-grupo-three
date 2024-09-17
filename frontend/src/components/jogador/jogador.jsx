import "./stylenotas.css";
import React from "react";
import Delete from "../../assets/delete.svg";
import Promote from "../../assets/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { deletaInteiro, deleteUserFromTime } from "../../redux/time/slice";
import { useNavigate, Navigate } from "react-router-dom";

function Jogador({ id, nome }) {
  const navigate = useNavigate(); // Hook para navegação
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const timeDados = useSelector((rootReducer) => rootReducer.time);
  const dispatch = useDispatch();
  const Times = timeDados.timeUser.payload;
  const qtdUser = timeDados.timeUser.payload.userId;
  const handleSairTime = async (e) => {
    e.preventDefault();
    if (qtdUser.length === 1) {
      try {
        console.log(Times);
        const result = await dispatch(
          deletaInteiro({
            id: Times._id,
            token: currentUser.logged,
          })
        );
        if (result) {
          console.log("voce excluiu o time", result);
          navigate("/login");
        }
        // Aqui você pode adicionar lógica adicional para lidar com o resultado
      } catch (error) {
        console.error("Erro ao tentar sair:", error);
        alert("Ocorreu um erro ao tentar sair.");
      }
    } else{ 
      if (currentUser.user._id === Times.userIdDono) {
        try {
          const result = await dispatch(
            deleteUserFromTime({
              timeId: Times._id,
              id: id,
              token: currentUser.logged,
            })
          );
          if (result) {
            console.log("voce saiu do time", result);
            navigate("/login");
          }
          // Aqui você pode adicionar lógica adicional para lidar com o resultado
        } catch (error) {
          console.error("Erro ao tentar sair:", error);
          alert("Ocorreu um erro ao tentar sair.");
        }
      } else{
        alert("Voce não tem permissão para excluir um jogador");
      }
    };
  }

  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <h1>{nome}</h1>
        <img
          src={Delete}
          onClick={handleSairTime}
          alt="menu"
          className="imagedelete"
        />
        {/* <img src={Promote} alt="menu" className="imagepromote" /> */}
      </div>
    </div>
  );
}
export default Jogador;
