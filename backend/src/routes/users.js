import express from "express";
import userController from "../controllers/userController.js";

const userRoutes = express.Router();
userRoutes.route("/user").post((req, res) => userController.create(req, res));

userRoutes.route("/user").get((req, res) => userController.getAll(req, res));

userRoutes.route("/user/:id").get((req, res) => userController.get(req, res));
userRoutes
  .route("/user/:id")
  .delete((req, res) => userController.delete(req, res));

userRoutes
  .route("/user/:id")
  .put((req, res) => userController.update(req, res));

export default userRoutes;
