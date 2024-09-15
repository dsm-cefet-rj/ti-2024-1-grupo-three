import { Convite } from "../models/conviteModel.js";
import { Time } from "../models/timeModel.js";
import { Torneio } from "../models/torneioModel.js";

async function create(req, res) {
  try {
    const { tipoConviteEnvio, usuarioRemetenteId, usuarioDestinatarioId, timeId, torneio } = req.body;

    let novoConvite;

    // Verificar se o tipo de convite foi enviado
    if (!tipoConviteEnvio) {
      return res.status(400).json({ message: "Tipo de convite não especificado" });
    }

    // Se o tipo de convite for "usuario_para_usuario"
    if (tipoConviteEnvio === "usuario_para_usuario") {
      // Verificar se os parâmetros necessários foram enviados
      if (!usuarioRemetenteId || !usuarioDestinatarioId) {
        return res.status(400).json({ message: "Dados insuficientes para convite de usuário para time" });
      }

      // Verificar se o remetente (dono do time), destinatário (usuário) e time existem
      const usuarioRemetente = usuarioRemetenteId; // Dono do time
      const usuarioDestinatario = usuarioDestinatarioId; // Usuário que vai ser convidado
      const timeRemetente = await Time.findOne({ userIdDono: usuarioRemetenteId });

      if (!timeRemetente) {
        return res.status(404).json({ message: "Time não encontrado" });
      }

      // Criar o convite para o usuário se juntar ao time
      novoConvite = new Convite({
        usuarioRemetente,
        usuarioDestinatario,
        timeRemetente: timeRemetente._id,
        tipoConvite: tipoConviteEnvio,
      });

    // Se o tipo de convite for "torneio_para_time"
    } else if (tipoConviteEnvio === "torneio_para_time") {
      // Verificar se os parâmetros necessários foram enviados
      if (!torneio || !timeId || !usuarioRemetenteId) {
        return res.status(400).json({ message: "Dados insuficientes para convite de torneio para time" });
      }

      // Criar o convite para o time se juntar ao torneio
      novoConvite = new Convite({
        usuarioRemetente: usuarioRemetenteId,
        torneio: torneio,
        timeDestinatario: timeId,
        tipoConvite: tipoConviteEnvio,
      });

    } else {
      return res.status(400).json({ message: "Tipo de convite inválido" });
    }

    // Salvar o convite no banco
    await novoConvite.save();
    return res.status(201).json({ message: "Convite criado com sucesso", convite: novoConvite });

  } catch (error) {
    console.error("Erro ao criar convite:", error);
    return res.status(500).json({ message: "Erro ao criar convite", error });
  }
}
async function getAll(req, res) {
  try {
    const {idDestinatario} = req.query;
    let resConvite;
    if(idDestinatario){
      resConvite = await Convite.find({
        usuarioDestinatario : idDestinatario
      });
    }else{
      resConvite = await Convite.find();
    }
    
    res.json(resConvite);
  } catch (error) {
    console.log(error);
  }
}
async function getByTimeDest(req, res) {
  try {
    const { destinatario } = req.params;  // Obtendo destinatário da rota

    // Verifique se o id do time destinatário foi enviado
    if (!destinatario) {
      return res.status(400).json({ message: "ID do destinatário não fornecido!" });
    }

    // Realiza a busca com o id do time destinatário
    const resConvite = await Convite.find({ timeDestinatario: destinatario });

    // Verifique se encontrou algum convite
    if (resConvite.length > 0) {
      return res.json(resConvite);
    } else {
      return res.status(404).json({ message: "Nenhum convite encontrado para o time destinatário." });
    }

  } catch (error) {
    console.error("Erro ao buscar convite:", error);
    return res.status(500).json({ message: "Erro ao buscar convite", error });
  }
}

async function aceitarConvite(req, res) {
  try {
    const  conviteId  = req.params.conviteId;

    // Buscar o convite pelo ID
    const convite = await Convite.findById(conviteId);

    if (!convite) {
      return res.status(404).json({ message: "Convite não encontrado" });
    }

    // Processamento de convite baseado no tipo de convite
    if (convite.tipoConvite === "usuario_para_usuario") {
      // Adicionar o usuário destinatário ao time
      const time = await Time.findById(convite.timeRemetente);
      if (!time) {
        return res.status(404).json({ message: "Time não encontrado" });
      }

      // Verificar se o usuário já faz parte do time comparando pelo _id
      const isAlreadyMember = time.userId.some(
        (user) => user._id === convite.usuarioDestinatario
      );

      if (isAlreadyMember) {
        return res.status(400).json({ message: "Usuário já faz parte do time" });
      }

      // Adicionar o objeto completo do usuário ao time
      time.userId.push(convite.usuarioDestinatario);
      await time.save();

      // Excluir o convite após a aceitação
      await Convite.findByIdAndDelete(conviteId);

      res.status(200).json({ message: "Convite aceito com sucesso", time });

    } else if (convite.tipoConvite === "torneio_para_time") {
      // Adicionar o time ao torneio
      const time = await Time.findById(convite.timeDestinatario);
      if (!time) {
        return res.status(404).json({ message: "Time não encontrado" });
      }
      const torneio = await Torneio.findById(convite.torneio)
      if(!torneio) {
        return res.status(404).json({ message: "Torneio não encontrado" });
      }
      if (!Array.isArray(torneio.Participantes)) {
        return res.status(500).json({ message: "Campo Participantes não encontrado ou inválido no torneio" });
      }
      // Verificar se o time já está no torneio
      const isAlreadyInTournament = torneio.Participantes.some(
        (time) => time._id === convite.timeRemetente
      );

      if (isAlreadyInTournament) {
        return res.status(400).json({ message: "Time já faz parte do torneio" });
      }

      // Adicionar o time ao torneio
      torneio.Participantes.push(convite.timeDestinatario);
      await torneio.save();

      // Excluir o convite após a aceitação
      await Convite.findByIdAndDelete(conviteId);

      res.status(200).json({ message: "Convite aceito com sucesso", torneio });
    } else {
      return res.status(400).json({ message: "Tipo de convite inválido" });
    }
  } catch (error) {
    console.error("Erro ao aceitar convite:", error);
    res.status(500).json({ message: "Erro ao aceitar convite", error });
  }
}
async function getByDestinatario(req,res) {
  try{
    const idDest = req.params.idDest
    const convite = await Convite.find({usuarioDestinatario: idDest})
    res.json(convite);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Erro ao buscar convite", error });
  }
    

}   
async function get(req, res) {
  try {
    const id = req.params.id;
    const convite = await Convite.findById(id);
    if (!convite) {
      res.status(404).json({ msg: "erro, não encontrado" });
      return;
    }
    res.json(convite);
  } catch (error) {
    console.log(error);
  }
}
async function deleteConvite(req, res) {
  try {
    const id = req.params.id;
    const convite = await Convite.findById(id);
    if (!convite) {
      res.status(404).json({ msg: "erro, não encontrado" });
      return;
    }

    const deletedconvite = await Convite.findByIdAndDelete(id);

    res.status(200).json({ deletedconvite, msg: "convite excluido" });
  } catch (error) {
    console.log(error);
  }
}
async function update(req, res) {
  const id = req.params.id;
  const convite = {
    id: req.body.id,
    idTimes: req.body.idtimes,
  };
  const updatedconvite = await Convite.findByIdAndUpdate(id, convite);
  if (!updatedconvite) {
    res.status(404).json({ msg: "erro, não encontrado" });
    return;
  }
  res.status(200).json({ convite, msg: "serviço atualizado com sucesso" });
}


export {create, getAll, getByTimeDest, aceitarConvite, getByDestinatario, get, deleteConvite, update};