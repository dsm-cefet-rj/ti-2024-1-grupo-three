import express from "express";
import {
  create,
  getAll,
  get,
  deletePartida,
  update,
  getPartidasByTime,
  updatePlacar,
  criarPartidaMOR,
} from "../controllers/partidaController.js";
import { checkToken } from "../middleware/Auth.js";

const partidaRoutes = express.Router();
partidaRoutes.post("/partidas", create);

partidaRoutes.get("/partidas", getAll);

partidaRoutes.get("/partidas/:id", checkToken, get);
partidaRoutes.delete("/partidas/:id", checkToken, deletePartida);
partidaRoutes.get("/partidas/time/:timeId", checkToken, getPartidasByTime);
partidaRoutes.put("/partidas/:id", checkToken, update);

partidaRoutes.put("/partidas/:id/placar", checkToken, updatePlacar);

partidaRoutes.post("/partidas/:torneioId", checkToken, criarPartidaMOR);
export default partidaRoutes;
