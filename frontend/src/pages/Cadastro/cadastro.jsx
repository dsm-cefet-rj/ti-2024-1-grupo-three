import React, { useState }from "react";
import "../Cadastro/cadastro.css"


const Cadastro = ()=>{
    const [user, setUser]= useState('');
    const [email, setEmail]= useState('');
    const [senha, setSenha]= useState('');
    const [inputErrorUser, setInputErrorUser] = useState(false);
    const [inputErrorEmail, setInputErrorEmail] = useState(false);
    const [inputErrorSenha, setInputErrorSenha] = useState(false);
    const [submitUser,setSubmitUser]= useState('');
    const [submitSenha,setSubmitSenha]= useState('');
    const [submitEmail,setSubmitEmail]= useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    function handleChangeUser(e){
        setUser(e.target.value);
    }
    function handleChangeSenha(e){
        setSenha(e.target.value);
    }
    function handleChangeEmail(e){
        setEmail(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!user.trim() || !email.trim() || !senha.trim()){
            if(!user.trim()){
                setInputErrorUser(true);
            }else{setInputErrorUser(false);}
            if(!email.trim()){
                setInputErrorEmail(true);
            }else{setInputErrorEmail(false);}
            if(!senha.trim()){
                setInputErrorSenha(true);
            }else{setInputErrorSenha(false);}
            
            return;
        }
        setInputErrorSenha(false);
        setInputErrorEmail(false);
        setInputErrorUser(false);
        setSubmitEmail(email);
        setSubmitSenha(senha);
        setSubmitUser(user);
        setEmail('');
        setSenha('');
        setUser('');
    }
    return(
    
        <div className="cadastro-container">
            <div>
                <div className="cadastro-header">
                <h1>cadastro</h1>
                </div>
                <div className="box-cadastro">
                    <form onSubmit={handleSubmit} className="form-cadastro">
                        <div>
                            <div>
                                <h3>seu email:</h3>
                                <input type="text" name="mensagem" value={email} onChange={handleChangeEmail} className={inputErrorEmail ? "input-error" : "input-certo"}></input>
                            </div>
                            <div>
                                <h3>seu usuario:</h3>
                                <input type="text" name="mensagem" value={user} onChange={handleChangeUser} className={inputErrorUser ? "input-error" : "input-certo"}></input>
                            </div>
                            <div>
                                <h3>sua senha:</h3>
                                <input type={passwordVisible ? "text" : "password"} name="mensagem" value={senha} onChange={handleChangeSenha} className={inputErrorSenha ? "input-error" : "input-certo"} ></input><br/>
                                <p className="condicao-senha">sua senha deve conter pelo menos 8 caracteres, uma<br/> letra maiúscula e um número</p>
                            </div>                        
                            <div>
                                <input type="checkbox" name="mostrar senha" checked={passwordVisible} onChange={handleTogglePasswordVisibility} className="checkbox-mostrar-senha" id="checkbox-senha"/>
                                <label htmlFor="checkbox-senha" className="btn-checkbox-personalizado">mostrar senha</label>
                            </div>
                        </div>                                            
                        <button type="submit" className="btn-cadastro">Cadastrar</button>
                        <p className="pergunta-cadastro">Já tem uma conta?</p><a className="entrar-login-cadastro">entrar</a>                        
                    </form>
                    
                </div>
            </div>
        </div>
                
    )
}

export default Cadastro;