import { Torneio } from "../models/Torneio.js";
const TorneioController = {
  create: async (req, res) => {
    try {
      const torneio = {
        id: req.body.id,
        nomeTorneio: req.body.nomeTorneio,
        userIdDonoTorneio: req.body.idDonoTorneio,
        tipoTorneio: req.body.tipoTorneio,
        qtdTimes: req.body.qtdTimes,
        localTorneio: req.body.localTorneio,
        Participantes: req.body.Participantes,
        //algo relacionado para convidar os times para o torneio
      };

      const response = await Torneio.create(torneio);
      res.status(201).json({ response, msg: "torneio criada com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const torneios = await Torneio.find();
      req.json(torneios);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const torneio = await Torneio.findById(id);
      if (!torneio) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }
      res.json(torneio);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const torneio = await Torneio.findById(id);
      if (!torneio) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }

      const deletedtorneio = await torneio.findByIdAndDelete(id);

      res.status(200).json({ deletedtorneio, msg: "torneio excluido" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const torneio = {
      id: req.body.id,
      nomeTorneio: req.body.nomeTorneio,
      userIdDonoTorneio: req.body.idDonoTorneio,
      tipoTorneio: req.body.tipoTorneio,
      qtdTimes: req.body.qtdTimes,
      localTorneio: req.body.localTorneio,
      Participantes: req.body.Participantes,
      //algo relacionado para convidar os times para o torneio
    };
    const updatedTorneio = await Torneio.findByIdAndUpdate(id, torneio);
    if (!updatedTorneio) {
      res.status(404).json({ msg: "erro, não encontrado" });
      return;
    }
    res.status(200).json({ torneio, msg: "serviço atualizado com sucesso" });
  },
};
export default TorneioController;
