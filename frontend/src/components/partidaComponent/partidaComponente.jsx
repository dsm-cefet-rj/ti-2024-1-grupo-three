import { React, useState} from "react";
import Seta from "../../assets/Arrow 1.svg";
import "./partidaComponente.css";
import Edit from "../../assets/edit.svg";
import Check from "../../assets/check.svg";
import { useDispatch, useSelector } from "react-redux";
import { updatePartida } from "../../redux/partida/slice";
/**
 * Componente PartidaComponente.
 *
 * Este componente exibe informações sobre uma partida, incluindo o nome do adversário, o resultado, a data e o local.
 *
 * @component
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.id - O identificador da partida.
 * @param {string} props.nome - O nome do adversário ou do jogo.
 * @param {string} props.resultado - O resultado da partida.
 * @param {string} props.data - A data em que a partida aconteceu ou vai acontecer.
 * @param {string} props.local - O local onde a partida aconteceu ou vai acontecer.
 * @returns {JSX.Element} Retorna o JSX que renderiza o componente de partida.
 */

function PartidaComponente({ id, nome, resultado, data, local }) {
  const [newResultado, setResultado] = useState("");
  const [editarResultado, setEditarResultado] = useState(false);
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const dispatch = useDispatch();

  const handleChange = (event, setText) => {
    setText(event.target.value);
  };

  const handleEditartrue = () => {
    setEditarResultado(true);
  };

  const handleEditarFalse = () => {
    setEditarResultado(false);
  };
  const handleUpdate = (e) => {
      if(newResultado != ""){
        const response = dispatch(
          updatePartida({
            placar: newResultado,
            token: currentUser.logged,
            id: id,
          })
        );
      } else {
        alert("Nome não pode ser vazio");
        handleEditarFalse();
      }
  };
  return (
    <div className="partidaContainer">
      <div className="divisao2">
        <div className="partidas">
          <div className="partidaNome">
            <h1>{nome}</h1>
          </div>
          <div className="divisao">
            <div className="infos">
            {editarResultado === true ? (
                <div className="">
                  <input
                    id="nome"
                    className=""
                    placeholder={resultado}
                    onChange={(event) => handleChange(event, setResultado)}
                  />
                </div>
                ) : (
                  <div className="">
                    <h2 className="">{resultado}</h2>
                  </div>
                )}
              <h2>{local}</h2>
            </div>
            <div className="">
              <h2>{data}</h2>
            </div>
            <div>
              {resultado === "" ? (
                <h2>{resultado}</h2>
              ) : (
                editarResultado === true ? (
                  <img src={Check} alt="menu" className="imageedit1" onClick={handleUpdate}/>
                ) : (
                  <img src={Edit} alt="menu" className="imageedit" onClick={handleEditartrue}/>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PartidaComponente;
