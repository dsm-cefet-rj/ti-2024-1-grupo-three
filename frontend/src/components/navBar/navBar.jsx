import React, { useState } from "react";
import Menu from "../../assets/menu.svg";
import Logo from "../../assets/logo.svg";
import User from "../../assets/user.svg";
import Lupa from "../../assets/lupa.svg";
import "./navBar.css";
import Convite from "../convite/convite";
import EnviarConvite from "../../components/EnvioConvite/EnvioConvite";
import Time from "../../pages/time/time";
import { useDispatch, useSelector } from "react-redux";
import { addLoggedUser, logoutUser } from "../../redux/user/slice";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EnvioConvite from "../../components/EnvioConvite/EnvioConvite";
import GerarPartida from "../gerarPartida/GerarPartida";

function NavBar() {
  const [aberto, setAberto] = useState(false);

  const abrirMenu = () => {
    setAberto(!aberto);
  };
  const currentUser = useSelector((rootReducer) => rootReducer.user);
  const dispatch = useDispatch();
  function handleLogOut() {
    dispatch(logoutUser());
  }
  const navigate = useNavigate();
  function handleFotoClick() {
    navigate(`/usuario`);
  }

  return (
    <div className="navBar">
      <div className="navbar-container">
        <div className="navBarHeader">
          <button className="menuHamButton" onClick={abrirMenu}>
            <img src={Menu} alt="menu" className="imagemenu" />
          </button>
          <img src={Logo} alt="logo" className="imagelogo" />
          <img
            src={User}
            alt="user"
            className="imageuser"
            onClick={handleFotoClick}
          />
        </div>
      </div>
      <div className="">
        {aberto ? (
          <div className="menu menuAberto">
            <div className="botoesDiv">
              <button className="botao1">
                <Link to="/meustorneios">torneios</Link>
              </button>
              <button className="botao2">
                <Link to="/Time">time</Link>
              </button>
              <button className="botao3">
                <Convite />
              </button>
              <button className="botao4">
                <EnvioConvite />
              </button>
              <button className="botao5">
                <GerarPartida />
              </button>
            </div>
            <button className="logout" onClick={handleLogOut}>
              <a href="/login">logout</a>
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
