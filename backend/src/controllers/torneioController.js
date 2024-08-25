import { Torneio } from "../models/Torneio.js";
import { Chat } from "../models/Chat.js";
import {User} from "../models/User.js";
import {Time} from "../models/Time.js";
const TorneioController = {
  create: async (req, res) => {
    try {
      const {
        nomeTorneio,
        userIdDonoTorneio,
        tipoTorneio,
        qtdTimes,
        localTorneio,
        participantesIds = [], // Inicializa como array vazio se não for fornecido
      } = req.body;

      // Procurar o usuário pelo ID fornecido
      const donoTorneio = await User.findById(userIdDonoTorneio);
      if (!donoTorneio) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      
      // Cria um novo chat para o torneio
      const novoChat = new Chat({
        mensagens: [],
      });
      await novoChat.save();

      // Pega os times participantes pelo ID (se houver)
      if (participantesIds){
        const participantes = await Time.find({
          _id: { $in: participantesIds },
        });
      }
      

      // Cria o novo torneio com o chat associado e os times participantes
      const novoTorneio = new Torneio({
        nomeTorneio,
        userIdDonoTorneio: donoTorneio,
        tipoTorneio,
        qtdTimes,
        localTorneio,
        chat: novoChat, // associa o chat ao torneio
        Participantes: [], // Associa os times encontrados ou deixa vazio
      });

      await novoTorneio.save();
      res.status(201).json({ novoTorneio, msg: "Torneio criado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar o torneio", error: error.message || error });
    }
  },
  getAll: async (req, res) => {
    try {
      const torneios = await Torneio.find();
      res.json(torneios);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const torneio = await Torneio.findById(id).populate("Participantes").populate("chat");
      if (!torneio) {
        res.status(404).json({ msg: "erro, não encontrado" });
        return;
      }
      // Checa se o usuário é participante do torneio
      const isParticipante = torneio.Participantes.some(
        (participante) => participante.userId === req.user.id
      );
      if (!isParticipante) {
        return res.status(403).json({ message: "Você não tem acesso a este torneio" });
      }
      res.status(200).json(torneio);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const torneio = await Torneio.findById(id);

      if (!torneio) {
        return res.status(404).json({ msg: "Torneio não encontrado" });
      }

      // Deleta o chat associado ao torneio, se existir
      if (torneio.chat) {
        await Chat.findByIdAndDelete(torneio.chat);
      }

      // Deleta o torneio
      await Torneio.findByIdAndDelete(id);

      res.status(200).json({ msg: "Torneio e chat excluídos com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir o torneio:", error);
      res.status(500).json({ message: "Erro ao excluir o torneio", error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nomeTorneio,
        userIdDonoTorneio,
        tipoTorneio,
        qtdTimes,
        localTorneio,
        participantesIds,
      } = req.body;

      const participantes = await Time.find({
        _id: { $in: participantesIds },
      });

      const torneio = {
        nomeTorneio,
        userIdDonoTorneio,
        tipoTorneio,
        qtdTimes,
        localTorneio,
        Participantes: participantes,
      };

      const updatedTorneio = await Torneio.findByIdAndUpdate(id, torneio, { new: true });

      if (!updatedTorneio) {
        return res.status(404).json({ message: "Torneio não encontrado" });
      }

      res.status(200).json({ updatedTorneio, msg: "Torneio atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar o torneio", error });
    }
  },
};
export default TorneioController;
