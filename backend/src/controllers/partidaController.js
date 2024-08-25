import { Partida } from "../models/Partida.js";
import { Time } from "../models/Time.js";

const partidaController = {
  create: async (req, res) => {
    try {
      const { timeMandante, timeVisitante} = req.body;
      const Mandante = await Time.findById(timeMandante);
      const Visitante = await Time.findById(timeVisitante);
      const novaPartida = new Partida({
        timeMandante: Mandante,
        timeVisitante: Visitante,
        placar: "0 x 0"
      })
      const response = await novaPartida.save();
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
      const { id } = req.params; // Pegue o ID da partida da URL
  
      // Encontrar a partida pelo ID
      const partida = await Partida.findById(id);
      if (!partida) {
        return res.status(404).json({ msg: "Partida não encontrada" });
      }
  
      // Usar Partida.findByIdAndDelete diretamente no modelo, não na instância
      await Partida.findByIdAndDelete(id);
  
      res.status(200).json({ msg: "Partida excluída com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir a partida", error });
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
  updatePlacar: async (req, res) => {
    try {
      const { id } = req.params; // ID da partida que será atualizada
      const { placar } = req.body; // Novo placar fornecido no corpo da requisição

      // Encontrar a partida pelo ID
      const partida = await Partida.findById(id);
      if (!partida) {
        return res.status(404).json({ message: "Partida não encontrada" });
      }

      // Atualizar o placar
      partida.placar = placar;

      // Salvar a partida atualizada
      await partida.save();

      res.status(200).json({ partida, message: "Placar atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar o placar:", error);
      res.status(500).json({ message: "Erro ao atualizar o placar", error });
    }
  },
};
export default partidaController;
