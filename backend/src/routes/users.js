import express from "express";
import { get, getAll, create, update, deleteUser, login} from "../controllers/userController.js";
import { checkToken } from "../middleware/Auth.js";

const userRoutes = express.Router();
  userRoutes.get('/user/:id',  get);
  userRoutes.get('/user', getAll);
  userRoutes.post('/user', create);
  userRoutes.patch('/user/:id', checkToken, update);
  userRoutes.delete('/user/:id', checkToken, deleteUser);
  userRoutes.post('/login', login);

export default userRoutes;