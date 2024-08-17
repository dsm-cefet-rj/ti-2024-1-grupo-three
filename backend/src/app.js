import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import conn from "./db/conn.js";
import routes from "./routes/app.js";
const app = express();
app.use(cors());
app.use(express.json());
conn();
//rotas
app.use("/api", routes);

app.listen(3000, function () {
  console.log("Servidor Online");
});
