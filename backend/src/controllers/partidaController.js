import { Partida } from "../models/Partida.js";

const partidaController = {
  create: async (req, res) => {
    try {
      const partida = {
        id: req.body.id,
        idTimes: req.body.idtimes,
      };

      const response = await Partida.create(partida);
      res.status(201).json({ response, msg: "partida criada com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const partidas = await Partida.find();
      req.json(partidas);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const partida = await Partida.findById(id);
      if (!partida) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }
      res.json(partida);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const partida = await Partida.findById(id);
      if (!partida) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }

      const deletedpartida = await partida.findByIdAndDelete(id);

      res.status(200).json({ deletedpartida, msg: "partida excluido" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const partida = {
      id: req.body.id,
      idTimes: req.body.idtimes,
    };
    const updatedPartida = await Partida.findByIdAndUpdate(id, partida);
    if (!updatedPartida) {
      res.status(404).json({ msg: "erro, não encontrado" });
      return;
    }
    res.status(200).json({ partida, msg: "serviço atualizado com sucesso" });
  },
};
export default partidaController;
