import mongoose from "mongoose";
import { Time } from "../models/timeModel.js";
import { User } from "../models/userModel.js";
const timeController = {
  create: async (req, res) => {
    try {
      const { nomeTime, userIdDono, userId } = req.body;
      // Criar o time com o ID do usuário dono
      const novoTime = new Time({
        nomeTime,
        userIdDono, // Linka o usuário ao time
        userId, // IDs de outros usuários membros, se houver
      });

      const response = await novoTime.save();
      res.status(201).json({ response, msg: "Time criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar time:", error);
      res.status(500).json({ error: `Erro ao criar time: ${error.message}` });
    }
  },
  getByOwner: async (req, res) => {
    try {
      const userIdDono = req.params.userIdDono; // Corrigido para req.params
      const time = await Time.findOne({ userIdDono: userIdDono }); // Confere se userIdDono é o campo correto

      if (!time) {
        return //res.status(404).json({ message: "Time não encontrado" });
      }

      return res.status(200).json(time);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar o time", error });
    }
  },

  getByUser: async (req, res) => {
    try {
      const userId = req.params.userId; // Corrigido para req.params
      const time = await Time.findOne({  userId: { 
        $elemMatch: { $eq: userId } 
      }  }); // Confere se userId é o campo correto

      if (!time) {
        return res.status(200).json({ message: "Time não encontrado" });
      }

      return res.status(200).json(time);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar o time", error });
    }
  },
  getAll: async (req, res) => {
    try {
      const { nome_like } = req.query;
      let timeRes;
      if (nome_like) {
        // Usando $regex para simular o LIKE no MongoDB
        timeRes = await Time.find({
          nomeTime: { $regex: nome_like, $options: "i" } // 'i' é para case-insensitive
        });
      } else {
        timeRes = await Time.find(); // O MongoDB usa find() para buscar todos os registros
      };
      res.json(timeRes);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const time = await Time.findById(id);
      if (!time) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }
      res.json(time);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const time = await Time.findById(id);
      if (!time) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }

      const deletedTime = await Time.findByIdAndDelete(id);

      res.status(200).json({ deletedTime, msg: "time excluido" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const time = {
      id: req.body.id,
      nomeTime: req.body.nometime,
      userIdDono: req.body.useriddono,
      userId: req.body.userid,
      //algo de convites
    };
    const updatedTime = await Time.findByIdAndUpdate(id, time);
    if (!updatedTime) {
      res.status(404).json({ msg: "erro, não encontrado" });
      return;
    }
    res.status(200).json({ time, msg: "serviço atualizado com sucesso" });
  },
};
export default timeController;
