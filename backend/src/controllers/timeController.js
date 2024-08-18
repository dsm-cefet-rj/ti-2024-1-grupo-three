import { Time } from "../models/Time.js";
const timeController = {
  create: async (req, res) => {
    try {
      const time = {
        id: req.body.id,
        nomeTime: req.body.nometime,
        userIdDono: req.body.useriddono,
        userId: req.body.userid,
        //algo de convites
      };

      const response = await Time.create(time);
      res.status(201).json({ response, msg: "Time criado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const times = await Time.find();
      req.json(times);
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
