import express from "express";
import partidaController from "../controllers/partidaController.js";

const partidaRoutes = express.Router();
partidaRoutes
  .route("/partidas")
  .post((req, res) => partidaController.create(req, res));

partidaRoutes
  .route("/partidas")
  .get((req, res) => partidaController.getAll(req, res));

partidaRoutes
  .route("/partidas/:id")
  .get((req, res) => partidaController.get(req, res));
partidaRoutes
  .route("/partidas/:id")
  .delete((req, res) => partidaController.delete(req, res));
partidaRoutes
  .route("/partidas/time/:timeId")
  .get((req, res) => partidaController.getPartidasByTime(req, res));
partidaRoutes
  .route("/partidas/:id")
  .put((req, res) => partidaController.update(req, res));

partidaRoutes
  .route("/partidas/:id/placar")
  .put((req, res) => partidaController.updatePlacar(req, res));

partidaRoutes
  .route("/partidas/:torneioId")
  .post((req, res) => partidaController.criarPartidaMOR(req, res));
export default partidaRoutes;
