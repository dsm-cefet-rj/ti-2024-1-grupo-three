import express from "express";
import {
  create,
  getTimesByTorneio,
  getTorneiosByTime,
  getByOwner,
  getAll,
  get,
  deleteTorneio,
  deleteTorneioByUserIdDonoTorneio,
  deleteTimeFromTorneio,
  update,
} from "../controllers/torneioController.js";
import { checkToken } from "../middleware/Auth.js";

const torneioRoutes = express.Router();

// Rotas para todos os torneios (criação e obtenção de todos)
torneioRoutes.post("/torneio", create); // Criação de torneio
torneioRoutes.get("/torneio", getAll); // Obtenção de todos os torneios

// Rotas para operações em torneios específicos (obtenção, atualização e exclusão)
torneioRoutes.get("/torneio/:id", checkToken, get); // Obtenção de um torneio específico
torneioRoutes.put("/torneio/:id", checkToken, update); // Atualização de um torneio específico
torneioRoutes.delete("/torneio/:id", checkToken, deleteTorneio); // Exclusão de um torneio específico
torneioRoutes.delete("/torneio/time/:id", checkToken, deleteTimeFromTorneio);

torneioRoutes.delete(
  "/torneios/dono/:userIdDonoTorneio",
  checkToken,
  deleteTorneioByUserIdDonoTorneio
);

torneioRoutes.get("/torneio/dono/:userIdDonoTorneio", checkToken, getByOwner); //1111111

torneioRoutes.get("/torneio/time/:timeId", checkToken, getTorneiosByTime); //11111

torneioRoutes.get("/torneio/meutime/:id", checkToken, getTimesByTorneio); ///1111111 (falar com lucas)

export default torneioRoutes;
