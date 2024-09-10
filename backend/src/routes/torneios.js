import express from "express";
import torneioController from "../controllers/torneioController.js";

const torneioRoutes = express.Router();

// Rotas para todos os torneios (criação e obtenção de todos)
torneioRoutes
  .route("/torneio")
  .post(torneioController.create)  // Criação de torneio
  .get(torneioController.getAll);  // Obtenção de todos os torneios

// Rotas para operações em torneios específicos (obtenção, atualização e exclusão)
torneioRoutes
  .route("/torneio/:id")
  .get(torneioController.get)      // Obtenção de um torneio específico
  .put(torneioController.update)   // Atualização de um torneio específico
  .delete(torneioController.delete); // Exclusão de um torneio específico
torneioRoutes
  .route("/torneio/dono/:userIdDonoTorneio")
  .get(torneioController.getByOwner)

torneioRoutes
  .route("/torneio/time/:timeId")
  .get(torneioController.getTorneiosByTime);  

torneioRoutes
  .route("/torneio/meutime/:id")
  .get(torneioController.getTimesByTorneio); 

export default torneioRoutes;

