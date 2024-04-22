import React, { useState }from "react";
import { Button } from "react-bootstrap";
import "../Cadastro/cadastro.css"


const Cadastro = ()=>{
    const [user, setUser]= useState('');
    const [senha, setSenha]= useState('');
    function handleChangeUser(e){
        setUser(e.target.value);
    }
    function handleChangeSenha(e){
        setSenha(e.target.value);
    }
    function handleSubmit(e){

    }
    return(
    
        <div className="cadastro-container">
            <div>
                <div className="cadastro-header">
                <h1>Login</h1>
                </div>
                <div className="cadastro-login">
                    <form onSubmit={handleSubmit}>
                        <h3>seu email:</h3>
                        <input type="text" name="mensagem" value={user} onChange={handleChangeUser}></input>
                        <h3>sua senha:</h3>
                        <input type="text" name="mensagem" value={senha} onChange={handleChangeSenha}></input><br/>
                        <p>sua senha deve conter pelo menos 8 caracteres, uma letra maiúscula e um número</p>
                        <Button variant="success">Logar</Button>
                    </form>
                </div>
            </div>
        </div>
                
    )
}

export default Cadastro;