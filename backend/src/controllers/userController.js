import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userController = {
  create: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      const userExist = await User.findOne({ email: email });

      if (userExist) {
        return res.status(422).json({ msg: "Por favor, utilize outro email!" });
      }
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(senha, salt);
      const newUser = new User({
        nome,
        email,
        senha: passwordHash,
      });

      const response = await newUser.save();
      res.status(201).json({ response, msg: "Usuário criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  },
  getAll: async (req, res) => {
    try {
      const userRes = await User.find();
      res.json(userRes);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const userRes = await User.findById(id, "-password");
      if (!userRes) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }
      res.json(userRes);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const userReq = await User.findById(id);
      if (!userReq) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }

      const deletedUser = await User.findByIdAndDelete(id);

      res.status(200).json({ deletedUser, msg: "Usuário excluido" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const userReq = {
      id: req.body.id,
      nome: req.body.nomeUser,
      email: req.body.emailUser,
      senha: req.body.userPass,
    };
    const updatedUser = await User.findByIdAndUpdate(id, userReq);
    if (!updatedUser) {
      res.status(404).json({ msg: "erro, não encontrado" });
      return;
    }
    res.status(200).json({ userReq, msg: "Usuário atualizado com sucesso" });
  },
};

export default userController;
