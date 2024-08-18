import express from "express";
import partidaRoutes from "./partidas.js";
import timeRoutes from "./times.js";
import torneioRoutes from "./torneios.js";
//import conviteRoutes from "./convites.js";
//import userRoutes from "./users.js";
const routes = express.Router();

routes.use(partidaRoutes);
routes.use(timeRoutes);
routes.use(torneioRoutes);
//routes.use(convitesRoutes);
//routes.use(userRoutes);

export default routes;
