import { Time } from "../models/timeModel.js";

async function create(req, res) {
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
}
async function getByOwner(req, res) {
  try {
    const userIdDono = req.params.userIdDono; // Corrigido para req.params
    const time = await Time.findOne({ userIdDono: userIdDono }); // Confere se userIdDono é o campo correto

    if (!time) {
      return; //res.status(404).json({ message: "Time não encontrado" });
    }

    return res.status(200).json(time);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar o time", error });
  }
}

async function getByUser(req, res) {
  try {
    const userId = req.params.userId; // Corrigido para req.params
    const time = await Time.findOne({
      userId: {
        $elemMatch: { $eq: userId },
      },
    }); // Confere se userId é o campo correto

    if (!time) {
      return res.status(200).json({ message: "Time não encontrado" });
    }

    return res.status(200).json(time);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar o time", error });
  }
}
async function getAll(req, res) {
  try {
    const { nome_like } = req.query;
    let timeRes;
    if (nome_like) {
      // Usando $regex para simular o LIKE no MongoDB
      timeRes = await Time.find({
        nomeTime: { $regex: nome_like, $options: "i" }, // 'i' é para case-insensitive
      });
    } else {
      timeRes = await Time.find(); // O MongoDB usa find() para buscar todos os registros
    }
    res.json(timeRes);
  } catch (error) {
    console.log(error);
  }
}
async function get(req, res) {
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
}

async function deleteUserFromTime(req, res) {
  //excluir jogador do time!
  try {
    const userId = req.params.id; // Obtain userId from request
    if (!userId) {
      res.status(400).json({ msg: "User ID is required" });
      return;
    }

    console.log("userid backend", userId);

    const time = await Time.findOne({
      userId: userId,
    });

    console.log("time encontrado", time);

    if (!time) {
      res.status(404).json({ msg: "Erro, não encontrado" });
      return;
    }

    // Assuming userId is an array and we want to remove the provided userId
    const userIndex = time.userId.indexOf(userId);
    if (userIndex === -1) {
      res.status(404).json({ msg: "Usuário não encontrado no time" });
      return;
    }

    time.userId.splice(userIndex, 1);
    await time.save();

    res.status(200).json({ time, msg: "Usuário removido do time" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
}

async function deleteTime(req, res) {
  //SAIR DO TIME!!!!!!!!!!! COM NOME DIFERENTE!
  try {
    const userId = req.params.id; // Obtain userId from request
    if (!userId) {
      res.status(400).json({ msg: "User ID is required" });
      return;
    }

    console.log("userid backend", userId);

    const time = await Time.findOne({
      userId: userId,
    });

    console.log("time encontrado", time);

    if (!time) {
      res.status(404).json({ msg: "Erro, não encontrado" });
      return;
    }

    // Assuming userId is an array and we want to remove the provided userId
    const userIndex = time.userId.indexOf(userId);
    if (userIndex === -1) {
      res.status(404).json({ msg: "Usuário não encontrado no time" });
      return;
    }

    time.userId.splice(userIndex, 1);
    await time.save();

    res.status(200).json({ time, msg: "Usuário removido do time" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
}
async function update(req, res) {
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
}

export { create, getByOwner, getByUser, getAll, get, deleteTime, update };
