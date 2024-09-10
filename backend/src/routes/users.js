import express from "express";
import userController from "../controllers/userController.js";
import jwt from "jsonwebtoken";
//import { useDispatch, useSelector } from "react-redux";
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //const token1 = useSelector((state) => state.auth.token);

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ msg: "token invalido!" });
  }
}
const userRoutes = express.Router();
userRoutes.route("/user").post((req, res) => userController.create(req, res));

// userRoutes.post("/login", AuthControllers.login);
// userRoutes.post("/Time", AuthControllers.checkToken);

userRoutes.route("/user").get((req, res) => userController.getAll(req, res));

userRoutes
  .route("/user/:id")
  .get(checkToken, (req, res) => userController.get(req, res));

userRoutes
  .route("/user/:id")
  .delete((req, res) => userController.delete(req, res));

userRoutes
  .route("/user/:id")
  .put((req, res) => userController.update(req, res));

export default userRoutes;
