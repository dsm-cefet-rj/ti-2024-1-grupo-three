import { Torneio } from "../models/torneioModel.js";
import { Chat } from "../models/chatModel.js";
import mongoose from "mongoose";
import { Time } from "../models/timeModel.js";

async function create(req, res) {
  try {
    const {
      nomeTorneio,
      userIdDonoTorneio,

      qtdTimes,
      localTorneio, // Inicializa como array vazio se não for fornecido
    } = req.body;
    let torneiosAntigos = [];
    torneiosAntigos = await Torneio.find({
      userIdDonoTorneio: userIdDonoTorneio,
    });
    if (torneiosAntigos.length > 0) {
      res.status(500).json({
        message: "usuário já é dono de um torneio",
        error: error.message || error,
      });
      return;
    }
    // Cria um novo chat para o torneio
    const novoChat = new Chat({
      mensagens: [],
    });
    await novoChat.save();

    // Cria o novo torneio com o chat associado e os times participantes
    const novoTorneio = new Torneio({
      nomeTorneio,
      userIdDonoTorneio,
      qtdTimes,
      localTorneio,
      chat: novoChat, // associa o chat ao torneio
      Participantes: [], // Associa os times encontrados ou deixa vazio
      Partidas: [],
    });

    await novoTorneio.save();
    res.status(201).json({ novoTorneio, msg: "Torneio criado com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar o torneio",
      error: error.message || error,
    });
  }
}
async function getTimesByTorneio(req, res) {
  try {
    const id = req.params.id; // Obtém o ID do torneio dos parâmetros da URL

    // Busca os torneios onde o time é participante
    const torneio = await Torneio.findById(id);
    if (!torneio) {
      return res
        .status(404)
        .json({ msg: "Nenhum time encontrado neste torneio" });
    }
    const times = torneio;
    return res.status(200).json(times);
  } catch (error) {
    console.error("Erro ao buscar times do torneio", error);
    res.status(500).json({ message: "Erro ao buscar times", error });
  }
}
async function getTorneiosByTime(req, res) {
  try {
    const timeId = req.params.timeId; // Obtém o ID do time dos parâmetros da URL

    // Busca os torneios onde o time é participante
    const torneios = await Torneio.find({
      Participantes: {
        $elemMatch: { $eq: timeId },
      },
    });

    if (!torneios) {
      return res
        .status(404)
        .json({ msg: "Nenhum torneio encontrado para esse time" });
    }

    res.status(200).json(torneios);
  } catch (error) {
    console.error("Erro ao buscar torneios para o time:", error);
    res.status(500).json({ message: "Erro ao buscar torneios", error });
  }
}
async function getByOwner(req, res) {
  try {
    const userIdDonoTorneio = req.params.userIdDonoTorneio;
    const torneio = await Torneio.findOne({
      userIdDonoTorneio: userIdDonoTorneio,
    });
    if (!torneio) {
      return res.status(404).json({ message: "Torneio não encontrado" });
    }

    return res.status(200).json(torneio);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar o torneio", error });
  }
}

async function getAll(req, res) {
  try {
    const { nome_like } = req.query;
    let resTorneio;
    if (nome_like) {
      resTorneio = await Torneio.find({
        nomeTorneio: { $regex: nome_like, $options: "i" },
      });
    } else {
      resTorneio = await Torneio.find();
    }

    res.json(resTorneio);
  } catch (error) {
    console.log(error);
  }
}
async function get(req, res) {
  try {
    const { id } = req.params;

    // Verifique se o ID está presente
    if (!id) {
      return res.status(400).json({ msg: "ID não fornecido." });
    }

    // Verifique se o ID é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido." });
    }

    // Realize a busca no banco de dados
    const torneio = await Torneio.findById(id);

    // Verifique se o torneio foi encontrado
    if (!torneio) {
      return res.status(404).json({ msg: "Torneio não encontrado." });
    }

    // Retorne o torneio encontrado
    return res.status(200).json(torneio);
  } catch (error) {
    console.error("Erro ao buscar torneio:", error);
    return res.status(500).json({ msg: "Erro ao buscar torneio", error });
  }
}

async function deleteTorneioByUserIdDonoTorneio(req, res) {
  //excluir torneio
  try {
    const userIdDonoTorneio = req.params.userIdDonoTorneio;
    if (!userIdDonoTorneio) {
      res.status(400).json({ msg: "user ID is required" });
      return;
    }

    console.log("userid backend", userIdDonoTorneio);

    const torneio = await Torneio.deleteOne({
      userIdDonoTorneio: userIdDonoTorneio,
    });

    return res.status(200).send({
      message: "torneio deletado com sucesso",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao deletar torneio" });
  }
}
async function deleteTimeFromTorneio(req, res) {
  try {
    const timeId = req.params.id; // Obtain userId from request
    if (!timeId) {
      res.status(400).json({ msg: "User ID is required" });
      return;
    }

    console.log("userid backend", timeId);

    const torneio = await Torneio.findOne({
      Participantes: timeId,
    });
    console.log("torneio encontrado", timeId);
    console.log("torneio encontrado", torneio);

    if (!torneio) {
      res.status(404).json({ msg: "Erro, não encontrado" });
      return;
    }

    // Assuming userId is an array and we want to remove the provided userId
    const timeIndex = torneio.Participantes.indexOf(timeId);
    if (timeIndex === -1) {
      res.status(404).json({ msg: "Time não encontrado no torneio" });
      return;
    }

    torneio.Participantes.splice(timeIndex, 1);
    await torneio.save();

    res.status(200).json({ torneio, msg: "Time removido do torneio" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
}

async function deleteTorneio(req, res) {
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
}
async function update(req, res) {
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

    const updatedTorneio = await Torneio.findByIdAndUpdate(id, torneio, {
      new: true,
    });

    if (!updatedTorneio) {
      return res.status(404).json({ message: "Torneio não encontrado" });
    }

    res
      .status(200)
      .json({ updatedTorneio, msg: "Torneio atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o torneio", error });
  }
}

export {
  create,
  getTimesByTorneio,
  getTorneiosByTime,
  getByOwner,
  getAll,
  get,
  deleteTorneio,
  deleteTorneioByUserIdDonoTorneio,
  deleteTimeFromTorneio,
  update,
};
