import express from "express";
import conviteController from "../controllers/conviteController.js"; // Ajuste o caminho conforme necessário

const conviteRoutes = express.Router();

// Rota para criar um novo convite
conviteRoutes.post("/convite", conviteController.create);

// Rota para obter todos os convites
conviteRoutes.get("/convites", conviteController.getAll);

// Rota para aceitar um convite por ID
conviteRoutes.post("/convite/:conviteId/aceitar", conviteController.aceitarConvite);

// Rota para obter um convite específico por ID
conviteRoutes.get("/convite/:id", conviteController.get);

// Rota para deletar um convite específico por ID
conviteRoutes.delete("/convite/:id", conviteController.delete);

// Rota para atualizar um convite específico por ID
conviteRoutes.put("/convite/:id", conviteController.update);

export default conviteRoutes;
