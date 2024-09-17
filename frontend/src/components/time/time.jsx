import "./stylenotas.css";
import { React, useState, useEffect } from "react";
import Delete from "../../assets/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTimeByTimeId } from "../../redux/time/slice";

const Time = ({ id }) => {
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
  return (
    <div className="tudo">
      <div className="jogadores-time1">
      {id === true ? (
                <img src={Check} alt="menu" className="imageedit" />
              ): (
                <img src={Edit} alt="menu" className="imageedit" onClick={handleEditartrue} />
              )}
        <h2>{nomeTime}</h2>
        <img src={Delete} alt="menu" className="imagedelete1" />
      </div>
    </div>
  );
};
export default Time;
