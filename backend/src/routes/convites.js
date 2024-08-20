import express from "express";
import conviteController from "../controllers/conviteController.js";

const conviteRoutes = express.Router();
conviteRoutes
  .route("/convite")
  .post((req, res) => conviteController.create(req, res));

  conviteRoutes
  .route("/convite")
  .get((req, res) => conviteController.getAll(req, res));

  conviteRoutes
  .route("/convite/:id")
  .get((req, res) => conviteController.get(req, res));
  conviteRoutes
  .route("/convite/:id")
  .delete((req, res) => conviteController.delete(req, res));

  conviteRoutes
  .route("/convite/:id")
  .put((req, res) => conviteController.update(req, res));

export default conviteRoutes;