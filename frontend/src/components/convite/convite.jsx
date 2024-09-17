import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeByTimeId } from "../../redux/time/slice";
import {
  fetchConvitesUsuario,
  fetchConvitesTime,
  aceitarConvite,
  recusarConvite,
} from "../../redux/convite/slice"; // Import actions from slice
import "./convite.css";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="modal-container1">
        <div className="modal1">
          <button className="fechar1" onClick={onClose}>
            x
          </button>
          <div className="modal-content">
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Convite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Access global state using useSelector
  const currentUser = useSelector((rootReducer) => rootReducer.user); // Access logged in user
  const timeDados = useSelector((rootReducer) => rootReducer.time); // Access team data
  const { convitesTime, convitesTorneio, loading, error } = useSelector(
    (rootReducer) => rootReducer.convite
  ); // Access invites data

  // Extract necessary information from the state
  const user = currentUser.user;
  const token = currentUser.logged;
  const timeUser = timeDados.timeUser;
  const isOwner = timeDados.eDono;

  useEffect(() => {
    if (isOpen && convitesTime.length === 0 && convitesTorneio.length === 0) {
      // Fetch user invites when modal opens
      if (user && user._id) {
        dispatch(
          fetchConvitesUsuario({ userId: user._id, token: currentUser.logged })
        );
      }
      // Fetch team invites if user is the owner of a team
      if (isOwner && timeUser && timeUser.payload._id) {
        dispatch(
          fetchConvitesTime({
            timeId: timeUser.payload._id,
            token: currentUser.logged,
          })
        );
      }
    }
  }, [
    isOpen,
    dispatch,
    user,
    token,
    timeUser,
    isOwner,
    convitesTime.length,
    convitesTorneio.length,
  ]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleRejeitar = async (idConvite) => {
    try {
      await dispatch(recusarConvite({ conviteId: idConvite, token: token }));
      
      // Recarregar convites após rejeitar
      if (user && user._id) {
        await dispatch(fetchConvitesUsuario({ userId: user._id, token: currentUser.logged }));
      }
      if (isOwner && timeUser && timeUser.payload._id) {
        await dispatch(fetchConvitesTime({ timeId: timeUser.payload._id, token: currentUser.logged }));
      }
    } catch (error) {
      console.error("Erro ao recusar convite:", error);
    }
  };

  const handleAceitar = async (idConvite) => {
    try {
      await dispatch(aceitarConvite({ conviteId: idConvite, token: token }));
      
      // Recarregar convites após aceitar
      if (user && user._id) {
        await dispatch(fetchConvitesUsuario({ userId: user._id, token: currentUser.logged }));
      }
      if (isOwner && timeUser && timeUser.payload._id) {
        await dispatch(fetchConvitesTime({ timeId: timeUser.payload._id, token: currentUser.logged }));
      }
    } catch (error) {
      console.error("Erro ao aceitar convite:", error);
    }
  };

  return (
    <div>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <div className="container-convites">
            <h2 className="tituloconvites">seus convites</h2>
            <div className="supergap">
              {/* Convites para Times */}
              <h2 className="convites-title">convites para times</h2>
              {convitesTime.length > 0 ? (
                convitesTime.map((convite) => (
                  <div key={convite._id} className="conteudo-convites">
                    <p>time: {convite.timeRemetente || "Carregando..."}</p>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn-aceita"
                        onClick={() => handleAceitar(convite._id)}
                      >
                        aceitar
                      </button>
                      <button
                        type="button"
                        className="btn-recusa"
                        onClick={() => handleRejeitar(convite._id)}
                      >
                        rejeitar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="naotem">
                  você não tem convites para times no momento.
                </p>
              )}

              {/* Convites para Torneios */}
              <h2 className="convites-title">convites para torneios</h2>
              {convitesTorneio.length > 0 ? (
                convitesTorneio.map((convite) => (
                  <div key={convite._id} className="conteudo-convites">
                    <p>torneio: {convite.torneio || "Carregando..."}</p>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn-aceita"
                        onClick={() => handleAceitar(convite._id)}
                      >
                        aceitar
                      </button>
                      <button
                        type="button"
                        className="btn-recusa"
                        onClick={() => handleRejeitar(convite._id)}
                      >
                        rejeitar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="naotem">
                  você não tem convites para torneios no momento.
                </p>
              )}
            </div>
          </div>
        </Modal>
      ) : (
        <button onClick={handleOpenModal} className="buttonconvite">
          convites
        </button>
      )}
    </div>
  );
};

export default Convite;
