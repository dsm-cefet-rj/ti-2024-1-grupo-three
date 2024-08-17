import express from "express";
import mongoose from "mongoose";
const app = express();
import userRoutes from "./routes/userRoutes.js";

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
//rotas da api
app.use("user/addUserAsync", userRoutes); //seria o user/addUserAsync? é o addUser no redux que envia o json com as constantes certo?
////////////////////////////parei aqui no min 46
//rota inicial
app.get("/", (req, res) => {
  //mostrar req
  res.json({ message: "oi express" });
});
//entregar uma porta

mongoose
  .connect(
    "mongodb+srv://calmon:calmon@futebrol.9krww.mongodb.net/?retryWrites=true&w=majority&appName=FuteBRol"
  )
  .then(() => {
    console.log("Conectando ao MongoDB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// npm start para conectar ao mongodb
