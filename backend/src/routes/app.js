import express from "express";
import partidaRoutes from "./partidas.js";
import timeRoutes from "./times.js";
import torneioRoutes from "./torneios.js";
import conviteRoutes from "./convites.js";
import userRoutes from "./users.js";
import chatRoutes from "./chat.js";
const routes = express.Router();

routes.use(partidaRoutes);
routes.use(timeRoutes);
routes.use(torneioRoutes);
routes.use(userRoutes);
routes.use(conviteRoutes);
routes.use(chatRoutes);

export default routes;
