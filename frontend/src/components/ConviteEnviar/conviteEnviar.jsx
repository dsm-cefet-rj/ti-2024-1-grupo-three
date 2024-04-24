import React from 'react';
import { useDispatch } from 'react-redux';
import { addInvite } from '../redux/invitesSlice';
import { v4 as idGen } from "uuid";

const conviteEnviar = ({ jogadorId, timeId }) => {
  const dispatch = useDispatch();

  const handleInvite = () => {
    dispatch(addInvite({ idUser:jogadorId, idTime:timeId, idConvite: idGen() }));
  };

  return (
    <button onClick={handleInvite}>Enviar Convite</button>
  );
};

export default conviteEnviar;