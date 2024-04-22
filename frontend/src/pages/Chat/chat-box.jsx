import React, { useState, useEffect, useRef } from "react";
import "../Chat/chatbox.css"
import Enviar from "../../assets/send.svg"

var mensagem = '';



const ChatBox = (props)=>{
    
    const [msg, setMsg]= useState('');
    const [submitMsg, setSubmitMsg]= useState([]);
    const chatHistoryRef = useRef(null);
    const [inputError, setInputError] = useState(false);
    const respostas =["Fala Pessoal!", "Boa noite!", "Al-mossar até morrer!", "Oi", "Al-bilal >>>> Al-mossar", "Adoro PSW! Salve Diogo"]
    const usuarios =["Lucas Calmon", "Bruno Chaves", "Marcus Junior", "Lucas Teixeira","Diogo Mendonca"];
    
    function getandomRespostas(){
        const randomIndex = Math.floor(Math.random() * respostas.length);
        return respostas[randomIndex];
    }
    function getandomUsuarios(){
        const randomIndex = Math.floor(Math.random() * usuarios.length);
        return usuarios[randomIndex];
    }
    function handleChangeMsg(e){
        setMsg(e.target.value)
    }

    function handleSubmit(e){
        const resposta= getandomRespostas();
        const user = getandomUsuarios();
        e.preventDefault();
        if(!msg.trim()){
            setInputError(true);
            return;
        }
        setInputError(false);
        setSubmitMsg([...submitMsg,{username:user,message:msg,resp:resposta}]);
        setMsg('')
        
    }
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [submitMsg]);
    return(
        <div className="container-chat">
            <div className="box-chat">
                 <div className="nome-liga-chat">
                        <h1>{props.nomeliga}</h1>
                 </div>
                 <div id="historico-chat" className="hist" ref={chatHistoryRef}>
                 {submitMsg.map((item, index)=>(<div><div className="box-my-message"> <p className="myMessage" key={index}>{item.message}</p> </div> <div className="box-response-message"><p className="name-chat">{item.username}</p><p className="response-chat">{item.resp}</p></div></div>))}
                 </div>
                 <div className="rodape-chat">
                        <form onSubmit={handleSubmit}>
                        <input type="text" name="mensagem" value={msg} onChange={handleChangeMsg} placeholder="Digite Aqui..." className={`input-chat ${inputError ? "input-error" : ""}`} />
                        <button type="submit" className="btn-chat"><img src={Enviar}/></button>
                        </form>                                                                 
                 </div>
            </div>
        </div>
    );
}
export default ChatBox;