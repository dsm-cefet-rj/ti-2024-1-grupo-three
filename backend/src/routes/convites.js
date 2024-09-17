import express from "express";
import {create, getAll, getByTimeDest, aceitarConvite, getByDestinatario, get, deleteConvite, update} from "../controllers/conviteController.js";
import { checkToken } from "../middleware/Auth.js";

const conviteRoutes = express.Router();

// Rota para criar um novo convite
conviteRoutes.post("/convite",checkToken, create);

// Rota para obter todos os convites
conviteRoutes.get("/convite",checkToken, getAll);

// Rota para aceitar um convite por ID
conviteRoutes.put("/convite/aceitar/:conviteId",checkToken, aceitarConvite);

// Rota para obter um convite específico por ID
conviteRoutes.get("/convite/:id",checkToken, get);

conviteRoutes.get("/convite/time/:destinatario",checkToken, getByTimeDest);

conviteRoutes.get("/convite/destinatario/:idDest",checkToken, getByDestinatario)
// Rota para deletar um convite específico por ID
conviteRoutes.delete("/convite/:id",checkToken, deleteConvite);

// Rota para atualizar um convite específico por ID
conviteRoutes.put("/convite/:id",checkToken, update);

export default conviteRoutes;