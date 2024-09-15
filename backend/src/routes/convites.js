import express from "express";
import {create, getAll, getByTimeDest, aceitarConvite, getByDestinatario, get, deleteConvite, update} from "../controllers/conviteController.js";
import { checkToken } from "../middleware/Auth.js";

const conviteRoutes = express.Router();

// Rota para criar um novo convite
conviteRoutes.post("/convite", create);

// Rota para obter todos os convites
conviteRoutes.get("/convite", getAll);

// Rota para aceitar um convite por ID
conviteRoutes.put("/convite/aceitar/:conviteId", aceitarConvite);

// Rota para obter um convite específico por ID
conviteRoutes.get("/convite/:id", get);

conviteRoutes.get("/convite/time/:destinatario", getByTimeDest);

conviteRoutes.get("/convite/destinatario/:idDest", getByDestinatario)
// Rota para deletar um convite específico por ID
conviteRoutes.delete("/convite/:id", deleteConvite);

// Rota para atualizar um convite específico por ID
conviteRoutes.put("/convite/:id", update);

export default conviteRoutes;