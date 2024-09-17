import { Partida } from "../models/partidaModel.js";
import { Time } from "../models/timeModel.js";
import { Torneio } from "../models/torneioModel.js";

async function create(req, res) {
  try {
    const { timeMandante, timeVisitante, TorneioId, data, local } = req.body;
    const Mandante = await Time.findById(timeMandante);
    const Visitante = await Time.findById(timeVisitante);
    const Torneios = await Torneio.findById(TorneioId);
    const novaPartida = new Partida({
      timeMandante: Mandante,
      timeVisitante: Visitante,
      data: data,
      local: local,
      placar: "0 x 0",
    });
    const response = await novaPartida.save();
    Torneios.Partidas.push(response._id);
    await Torneios.save();
    res.status(201).json({ response, msg: "partida criada com sucesso" });
  } catch (error) {
    console.log(error);
  }
}
async function getAll(req, res) {
  try {
    const partidas = await Partida.find();
    req.json(partidas);
  } catch (error) {
    console.log(error);
  }
}
async function get(req, res) {
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
}
async function deletePartida(req, res) {
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
}
async function update(req, res) {
  const id = req.params.id;
  const partida = {
    placar: req.body.placar,
  };
  const updatedPartida = await Partida.findByIdAndUpdate(id, partida);
  if (!updatedPartida) {
    res.status(404).json({ msg: "erro, não encontrado" });
    return;
  }
  res.status(200).json({ partida, msg: "serviço atualizado com sucesso" });
}
async function getPartidasByTime(req, res) {
  try {
    const { timeId } = req.params;

    // Buscando todas as partidas em que o time é o mandante ou visitante
    const partidas = await Partida.find({
      $or: [{ "timeMandante._id": timeId }, { "timeVisitante._id": timeId }],
    });

    // Preparando a resposta para incluir o nome do adversário
    const partidasComAdversario = partidas.map((partida) => {
      let adversario;
      if (partida.timeMandante._id.toString() === timeId) {
        adversario = partida.timeVisitante.nomeTime;
      } else {
        adversario = partida.timeMandante.nomeTime;
      }
      return {
        _id: partida._id,
        data: partida.data,
        local: partida.local,
        placar: partida.placar,
        adversario,
        isMandante: partida.timeMandante._id.toString() === timeId,
      };
    });

    res.status(200).json(partidasComAdversario);
  } catch (error) {
    console.error("Erro ao buscar partidas:", error);
    res.status(500).json({ message: "Erro ao buscar partidas", error });
  }
}
async function updatePlacar(req, res) {
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
}
async function criarPartidaMOR(req, res) {
  try {
    const torneioId = req.params.torneioId;

    // Busca o torneio pelo ID
    const torneio = await Torneio.findById(torneioId);

    if (!torneio) {
      return res.status(404).json({ error: "Torneio não encontrado" });
    }

    // Verifica se o número de participantes é igual ao número de times do torneio
    if (torneio.Participantes.length === torneio.qtdTimes) {
      const partidas = [];
      const qtdPartidas = torneio.qtdTimes / 2;

      for (let i = 0; i < qtdPartidas; i++) {
        // Você precisa definir como os times serão emparelhados
        const time1 = torneio.Participantes[i * 2];
        const time2 = torneio.Participantes[i * 2 + 1];
        const local = torneio.localTorneio;
        const Mandante1 = await Time.findById(time1);
        const Visitante1 = await Time.findById(time2);

        const dataAtual = new Date();
        const dataFormatada = dataAtual.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const novaPartida = new Partida({
          timeMandante: Mandante1,
          timeVisitante: Visitante1,
          data: dataFormatada, // Define a data como quiser
          local: local,
          placar: "0 x 0",

          // torneio: torneioId,
        });

        // Adiciona a nova partida no array de partidas
        partidas.push(novaPartida);
      }

      // Salva todas as partidas de uma vez no MongoDB
      await Partida.insertMany(partidas);

      return res
        .status(201)
        .json({ message: "Partidas criadas com sucesso!", partidas });
    } else {
      return res.status(400).json({
        error: "Número de participantes não é suficiente para criar partidas.",
      });
    }
  } catch (error) {
    console.error("Erro ao criar partidas:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export {
  create,
  getAll,
  get,
  deletePartida,
  update,
  getPartidasByTime,
  updatePlacar,
  criarPartidaMOR,
};
