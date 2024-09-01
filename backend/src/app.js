import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import conn from "./db/conn.js";
import routes from "./routes/app.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./models/User.js";

const app = express();
app.use(cors());
app.use(express.json());
conn();
//rotas
app.use("/api", routes);

//credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@futebrol.9krww.mongodb.net/?retryWrites=true&w=majority&appName=FuteBRol`).then(() => {
// app.listen(3000, function () {
//  console.log("Servidor Online");
//});
//})
//.catch((err)=> console.log(err))
app.listen(3004, function () {
  console.log("Servidor Online!");
});
//models

//Login User
app.post("/auth/login", async (req, res) => {
  const { email, senha } = req.body;

  //check if user exist
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).json({ msg: "Usuário não encontrado!" });
  }

  //check if senha match
  const checksenha = await bcrypt.compare(senha, user.senha);
  if (!checksenha) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
});

// //rotapricvada
// app.get("/user/:id", chcecktoken, async (req, res) => {
//   const id = req.params.id;

//   //chack if user exist
//   const user = await User.findById(id, "-password");

//   if (!user) {
//     return res.status(404).json({ msg: "Usuario nao encontrado" });
//   }

//   res.status(200).json({ user });
// });

// function chcecktoken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split("")[1];

//   if (!token) {
//     return res.status(401).json({ msg: "Acesso negado!" });
//   }

//   try {
//     const secret = process.env.SECRET;

//     jwt.verify(token, secret);
//     next();
//   } catch (error) {
//     res.status(400).json({ msg: "token invalido!" });
//   }
// }
