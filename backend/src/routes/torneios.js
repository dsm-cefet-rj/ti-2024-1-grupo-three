import express from "express";
import torneioController from "../controllers/torneioController.js";

const torneioRoutes = express.Router();
torneioRoutes
  .route("/torneios")
  .post((req, res) => torneioController.create(req, res));

torneioRoutes
  .route("/torneios")
  .get((req, res) => torneioController.getAll(req, res));

torneioRoutes
  .route("/torneios/:id")
  .get((req, res) => torneioController.get(req, res));
torneioRoutes
  .route("/torneios/:id")
  .delete((req, res) => torneioController.delete(req, res));

torneioRoutes
  .route("/torneios/:id")
  .put((req, res) => torneioController.update(req, res));

export default torneioRoutes;
