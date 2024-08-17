import express from "express";
import mongoose from "mongoose";
const app = express();
import Person from "../models/Person.js";

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
//rotas da api
app.post("/person", async (req, res) => {
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);
    res.status(201).json({ message: "Pessoa inserida no sistema com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
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
