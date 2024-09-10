import "./stylenotas.css";
import { React, useState, useEffect } from "react";
import axios from "axios";

const Time = ({id}) => {
  const [nomeTime, setNomeTime] = useState("");
  useEffect(() => {
  const fetchTime = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3004/api/time/${id}`
      );
      const time = response.data;
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
        <div className="info-j">
          <h2>{nomeTime}</h2>
        </div>
      </div>
    </div>
  );
}
export default Time;