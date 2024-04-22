import React from "react";
import NavBar from "../../components/navBar/navBar"
import "./criarTime.css"

const CriarTime = () => {
    
    return(
        <div>
            <NavBar/>
            <form className="formCriarTime">
                <div className="nomeCriarTime">
                    <h1 className="nomedoTime">Nome do time:</h1>
                    <input type="text" className="inputCriarTime"/>
                </div>
            </form>
            <div className="formCriarTime">
                <button className="botaoCriarTime">criar um time</button>
            </div> 
        </div>
    );
};

export default CriarTime;