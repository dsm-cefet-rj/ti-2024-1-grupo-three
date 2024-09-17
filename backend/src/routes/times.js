import express from "express";
import {
  create,
  getByOwner,
  getByUser,
  getAll,
  get,
  update,
  deleteUserFromTime,
  deletaInteiro
} from "../controllers/timeController.js";
import { checkToken } from "../middleware/Auth.js";

const timeRoutes = express.Router();
// Rota para criar um novo time (POST)
timeRoutes.post("/time", create);

// Rota para obter todos os times (GET)
timeRoutes.get("/time", getAll);

// Rota para obter um time específico por ID (GET)
timeRoutes.get("/time/:id", checkToken, get);

timeRoutes.get("/time/user/:userId", checkToken, getByUser);

timeRoutes.get("/time/dono/:userIdDono", checkToken, getByOwner);

//rota para tirar jogador do time
timeRoutes.delete("/times/:id", checkToken, deleteUserFromTime);

timeRoutes.delete("/time/inteiro/:id", checkToken, deletaInteiro);
// Rota para atualizar um time específico por ID (PUT)
timeRoutes.put("/time/:id", checkToken, update);

export default timeRoutes;
