import React, { useState }from "react";
import { Button } from "react-bootstrap";
import "../Login/login.css"
import NavBarTest from "../../components/navBarTest";

const Login = ()=>{
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
    
        <div className="login-container">
            <div>
                <div className="login-header">
                <h1>Login</h1>
                </div>
                <div className="box-login">
                    <form>
                        <h3>Usuario:</h3>
                        <input type="text" name="mensagem" value={user} onChange={handleChangeUser}></input>
                        <h3>Senha:</h3>
                        <input type="text" name="mensagem" value={senha} onChange={handleChangeSenha}></input><br/>
                        <Button variant="success">Logar</Button>
                    </form>
                </div>
            </div>
        </div>
                
    )
}

export default Login;