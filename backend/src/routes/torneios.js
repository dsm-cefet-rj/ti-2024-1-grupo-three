import express from "express";
import {create, getTimesByTorneio, getTorneiosByTime, getByOwner, getAll, get, deleteTorneio, update} from "../controllers/torneioController.js";
import { checkToken } from "../middleware/Auth.js";

const torneioRoutes = express.Router();

// Rotas para todos os torneios (criação e obtenção de todos)
torneioRoutes.post("/torneio", create); // Criação de torneio
torneioRoutes.get("/torneio", getAll); // Obtenção de todos os torneios

// Rotas para operações em torneios específicos (obtenção, atualização e exclusão)
torneioRoutes.get("/torneio/:id", get)      // Obtenção de um torneio específico
torneioRoutes.put("/torneio/:id", update)   // Atualização de um torneio específico
torneioRoutes.delete("/torneio/:id", deleteTorneio) // Exclusão de um torneio específico
torneioRoutes.get("/torneio/dono/:userIdDonoTorneio", getByOwner);

torneioRoutes.get("/torneio/time/:timeId", getTorneiosByTime);  

torneioRoutes.get("/torneio/meutime/:id", getTimesByTorneio); 

export default torneioRoutes;