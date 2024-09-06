import express from "express";
import timeController from "../controllers/timeController.js";

const timeRoutes = express.Router();
// Rota para criar um novo time (POST)
timeRoutes.post("/time", timeController.create);

// Rota para obter todos os times (GET)
timeRoutes.get("/time", timeController.getAll);

// Rota para obter um time específico por ID (GET)
timeRoutes.get("/time/:id", timeController.get);

timeRoutes.get("/time/oi/:userId", timeController.getByUser);

timeRoutes.get("/time/oii/:userIdDono", timeController.getByOwner);

// Rota para deletar um time específico por ID (DELETE)
timeRoutes.delete("/time/:id", timeController.delete);

// Rota para atualizar um time específico por ID (PUT)
timeRoutes.put("/time/:id", timeController.update);

export default timeRoutes;
