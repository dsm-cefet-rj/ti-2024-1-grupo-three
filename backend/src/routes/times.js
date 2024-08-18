import express from "express";
import timeController from "../controllers/timeController.js";

const timeRoutes = express.Router();
timeRoutes.route("/times").post((req, res) => timeController.create(req, res));

timeRoutes.route("/times").get((req, res) => timeController.getAll(req, res));

timeRoutes.route("/times/:id").get((req, res) => timeController.get(req, res));
timeRoutes
  .route("/times/:id")
  .delete((req, res) => timeController.delete(req, res));

timeRoutes
  .route("/times/:id")
  .put((req, res) => timeController.update(req, res));

export default timeRoutes;
