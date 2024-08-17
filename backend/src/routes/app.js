import express from "express";
//import partidaRoutes from "./Partida.js";
import timeRoutes from "./times.js";
//import torneioRoutes from "./torneioRoutes.js";
const routes = express.Router();

//routes.use(partidaRoutes);
routes.use(timeRoutes);
//routes.use(torneioRoutes);

export default routes;
