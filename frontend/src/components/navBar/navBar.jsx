import React, { useState } from "react";
import Menu from "../../assets/menu.svg";
import Logo from "../../assets/logo.svg";
import User from "../../assets/user.svg";
import Lupa from "../../assets/lupa.svg";
import "./navBar.css";
import Convite from "../convite/convite";
import Time from "../../pages/time/time";

function NavBar() {
  const [aberto, setAberto] = useState(false);

  const abrirMenu = () => {
    setAberto(!aberto);
  };

  return (
    <div className="navBar">
      <div className="navbar-container">
        <div className="navBarHeader">
          <button className="menuHamButton" onClick={abrirMenu}>
            <img src={Menu} alt="menu" className="imagemenu" />
          </button>
          <img src={Logo} alt="logo" className="imagelogo" />
          <img src={User} alt="user" className="imageuser" />
        </div>
        <div className="navBarSearch">
          <form action="">
            <input type="text" />
          </form>
          <button>
            <img src={Lupa} className="imagelupa" />
          </button>
        </div>
      </div>
      <div className="">
        {aberto ? (
          <div className="menu">
            <div className="botoesDiv">
              <button className="botao1">
                <a href="/meustorneios">Torneios</a>
              </button>
              <button className="botao2">
                <a className="timelink" href="/Time">
                  Time
                </a>
              </button>
              <button className="botao3">
                <Convite />
              </button>
            </div>
            <button className="logout">Logout</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
