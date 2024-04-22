import React from "react";
import { Button } from "react-bootstrap";

const Login = ()=>{
    const [user, setUser]= useState('');
    const [senha, setSenha]= useState('');
    return(
        <div className="login-container">
            <div className="login-header">
                <h1>Login</h1>
            </div>
            <div className="box-login">
                <form>
                    <h3>Usuario:</h3>
                    <input type="text" name="mensagem" value={user}></input>
                    <h3>Senha:</h3>
                    <input type="text" name="mensagem" value={senha}></input>
                    <Button variant="outline-secondary">Logar</Button>
                </form>
            </div>
        </div>
    )
}

export default Login;