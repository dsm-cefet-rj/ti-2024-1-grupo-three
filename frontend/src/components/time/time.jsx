import "./stylenotas.css";
import { React, useState, useEffect } from "react";
import axios from "axios";
import Delete from "../../assets/delete.svg";

const Time = ({ id }) => {
  const timeUser = useSelector((rootReducer) => rootReducer.timeUser);
  const [nomeTime, setNomeTime] = useState("");
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const time = timeUser;
        if (time) {
          setNomeTime(time.nomeTime);
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do time:", error);
      }
    };
    fetchTime();
  }, [id]);
  return (
    <div className="tudo">
      <div className="jogadores-time1">
        <h2>{nomeTime}</h2>
        <img src={Delete} alt="menu" className="imagedelete1" />
      </div>
    </div>
  );
};
export default Time;
