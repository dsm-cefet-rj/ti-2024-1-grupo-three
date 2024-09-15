import express from "express";
import {create, getAll, get, deletePartida, update, getPartidasByTime, updatePlacar, criarPartidaMOR} from "../controllers/partidaController.js";
import { checkToken } from "../middleware/Auth.js";

const partidaRoutes = express.Router();
partidaRoutes.post("/partidas", create);

partidaRoutes.get("/partidas", getAll);

partidaRoutes.get("/partidas/:id", get);
partidaRoutes.delete("/partidas/:id", deletePartida);
partidaRoutes.get("/partidas/time/:timeId", getPartidasByTime);
partidaRoutes.put("/partidas/:id", update);

partidaRoutes.put("/partidas/:id/placar", updatePlacar);

partidaRoutes.post("/partidas/:torneioId", criarPartidaMOR);
export default partidaRoutes;
