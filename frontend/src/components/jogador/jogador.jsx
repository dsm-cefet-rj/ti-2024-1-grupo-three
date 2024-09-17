import "./stylenotas.css";
import React from "react";
import Delete from "../../assets/delete.svg";
import Promote from "../../assets/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFromTime } from "../../redux/time/slice";
import { useNavigate, Navigate } from "react-router-dom";

function Jogador({ id, nome }) {
  const navigate = useNavigate(); // Hook para navegação
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const timeDados = useSelector((rootReducer) => rootReducer.time);
  const dispatch = useDispatch();
  const Times = timeDados.timeUser.payload;
  console.log("Timasturbo", Times);
  const handleDeleteUserTime = async (e) => {
    e.preventDefault();
    try {
      if (currentUser.user._id === Times.userIdDono) {
        const result = await dispatch(
          deleteUserFromTime({
            timeId: Times._id,
            id: id, //não pode ser current user, tem que ser id selecionado
            token: currentUser.logged,
          })
        );
        if (result) {
          console.log("voce saiu do time", result);
          navigate("/login");
        }
      } else {
        alert("Você não é o dono desse time!");

        // Aqui você pode adicionar lógica adicional para lidar com o resultado
      }
    } catch (error) {
      console.error("Erro ao tentar remover:", error);
      alert("Ocorreu um erro ao tentar remover.");
    }
  };

  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <h1>{nome}</h1>
        <img
          src={Delete}
          onClick={handleDeleteUserTime}
          alt="menu"
          className="imagedelete"
        />
        {/* <img src={Promote} alt="menu" className="imagepromote" /> */}
      </div>
    </div>
  );
}
export default Jogador;
