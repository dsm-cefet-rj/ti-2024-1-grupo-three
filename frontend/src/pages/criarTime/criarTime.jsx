import React, { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./criarTime.css";
import { v4 as idGen } from "uuid";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTime, addTimeAsync } from "../../redux/time/slice";
import { jwtDecode } from "jwt-decode";

const CriarTime = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [nomeTime, setNomeTime] = useState("");
  const navigate = useNavigate();
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const userIdDono = decodedToken.id;
  console.log(decodedToken.id);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log(`id ususario: ${decodedToken.id}`);

      const response = await fetch("http://localhost:3004/api/time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomeTime, userIdDono, userId }),
      });

      navigate("/time");
    } catch (error) {
      console.log(`id ususario: ${decodedToken.id}`);
      console.error("Erro ao criar o time:", error);
      alert("Erro ao criar o time. Por favor, tente novamente.");
      // Aqui você pode verificar o tipo de erro e, se necessário, redirecionar para a página de login
    }
  };
  function handleChange(e) {
    setNomeTime(e.target.value);
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  const initialValues = {
    nomeTime: nomeTime,
    userIdDono: decodedToken.id,
    idUser: [decodedToken.id],
  };

  return (
    <div>
      <NavBar />

      <form
        className="formCriarTime"
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
      >
        <div className="nomeCriarTime">
          <h1 className="nomedoTime">Nome do time:</h1>
          <input
            type="text"
            className="inputCriarTime"
            onChange={handleChange}
          />
        </div>
        <div className="formCriarTime">
          <button className="botaoCriarTime" type="submit">
            criar um time
          </button>
        </div>
      </form>
    </div>
  );
};

export default CriarTime;