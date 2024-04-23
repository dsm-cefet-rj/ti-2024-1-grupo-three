import React, { useState } from "react";
import NavBar from "../../components/navBar/navBar"
import "./criarTime.css"
import { v4 as idGen } from "uuid";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTime, addTimeAsync } from "../../redux/time/slice";


const CriarTime = () => {
    const dispatch = useDispatch();
    const [nomeTime,setNomeTime]=useState("");
    const navigate = useNavigate();
    const currentUser = useSelector(rootReducer => rootReducer.user);
    const handleSubmitForm = (value) => {
        
        dispatch(addTimeAsync({nomeTime:initialValues.nomeTime, userIdDono:initialValues.userIdDono, id:idGen(), idUser:initialValues.idUser}))
        navigate("/time")
    }
    function handleChange(e){
        setNomeTime(e.target.value);
    }
    
     if (!currentUser.logged) {
        return <Navigate to="/login" />;
    } 
     
    const initialValues = {
        nomeTime: nomeTime,
        userIdDono: currentUser.user.id,
        idUser: currentUser.user.id,     
    }
    
    return(
        <div>
            <NavBar/>
            
                <form className="formCriarTime" onSubmit={(values)=>{handleSubmitForm(values)}}  >
                    <div className="nomeCriarTime">
                        <h1 className="nomedoTime">Nome do time:</h1>
                        <input type="text" className="inputCriarTime" onChange={handleChange}/>
                    </div>
                    <div className="formCriarTime">
                    <button className="botaoCriarTime" type="submit">criar um time</button>
                    </div> 
                </form>
                                    
        </div>
    );
};

export default CriarTime;