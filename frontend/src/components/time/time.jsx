import "./stylenotas.css";
import { React, useState, useEffect } from "react";
import Delete from "../../assets/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTimeByTimeId } from "../../redux/time/slice";
import { deleteTimeFromTorneio } from "../../redux/torneios/slice";
import { useNavigate } from "react-router-dom";

const Time = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nomeTime, setNomeTime] = useState("");
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await dispatch(
          getTimeByTimeId({
            _id: id,
            token: currentUser.logged
          })
        );
        const time = response.payload;
        if (time) {
          setNomeTime(time.nomeTime);
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do time:", error);
      }
    };
    fetchTime();
  }, [id]);
  const handleSairTime = async (e) => {
    e.preventDefault();
        try {
          const result = await dispatch(
            deleteTimeFromTorneio({
              id: id,
              token: currentUser.logged,
            })
          );
          if (result) {
            console.log("voce excluiu o time do torneio", result);
            navigate("/login");
          }
          // Aqui você pode adicionar lógica adicional para lidar com o resultado
        } catch (error) {
          console.error("Erro ao tentar sair:", error);
          alert("Ocorreu um erro ao tentar sair.");
        }
    };
  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <h2>{nomeTime}</h2>
        <img src={Delete} alt="menu" className="imagedelete1" onClick={handleSairTime} />
      </div>
    </div>
  );
};
export default Time;
