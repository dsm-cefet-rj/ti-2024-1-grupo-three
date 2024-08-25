import { Convite } from "../models/Convite.js";
import { User } from "../models/User.js";
import { Time } from "../models/Time.js";
import { Torneio } from "../models/Torneio.js";
const conviteController = {
  create: async (req, res) => {
    try {
      const { tipoConvite, usuarioRemetenteId, usuarioDestinatarioId, timeId } = req.body;

      let novoConvite;

      if (tipoConvite === "usuario_para_time") {
        // Verificar se o remetente (dono do time), destinatário (usuário) e time existem
        const usuarioRemetente = await User.findById(usuarioRemetenteId); // Dono do time
        const usuarioDestinatario = await User.findById(usuarioDestinatarioId); // Usuário que vai ser convidado
        const timeRemetente = await Time.findOne({ userIdDono: usuarioRemetenteId }); // Time de quem enviou o convite

        if (!usuarioRemetente || !usuarioDestinatario || !timeRemetente) {
          return res.status(404).json({ message: "Usuário ou Time não encontrado" });
        }

        // Criar o convite para o usuário se juntar ao time
        novoConvite = new Convite({
          usuarioRemetente: usuarioRemetente,
          usuarioDestinatario: usuarioDestinatario,
          timeRemetente: timeRemetente,
          tipoConvite: tipoConvite,
        });
      } else if (tipoConvite === "torneio_para_time") {
        // Verificar se o torneio e o time existem
        const timeDestinatario = await Time.findById(timeId); // Time que será convidado para o torneio
        const usuarioDestinatario = await User.findById(timeDestinatario.userIdDono)
        const usuarioRemetente = await User.findById(usuarioRemetenteId); // Torneio que está convidando o time
        const torneio = await Torneio.findOne({"userIdDonoTorneio._id": usuarioRemetenteId})

        if (!timeDestinatario) {
          return res.status(404).json({ message: "timeDestinatario não encontrado" });
        }
        if (!usuarioDestinatario ) {
          return res.status(404).json({ message: "usuarioDestinatario não encontrado" });
        }
        if (!usuarioRemetente) {
          return res.status(404).json({ message: "usuarioRemetente não encontrado" });
        }
        if (!torneio) {
          return res.status(404).json({ message: "torneio não encontrado" });
        }

        // Criar o convite para o time se juntar ao torneio
        novoConvite = new Convite({
          usuarioRemetente: usuarioRemetente,
          torneio: torneio, 
          timeDestinatario: timeDestinatario,
          usuarioDestinatario : usuarioDestinatario,
          tipoConvite: tipoConvite,
        });
      } else {
        return res.status(400).json({ message: "Tipo de convite inválido" });
      }

      await novoConvite.save();
      res.status(201).json({ message: "Convite criado com sucesso", convite: novoConvite });
    } catch (error) {
      console.error("Erro ao criar convite:", error);
      res.status(500).json({ message: "Erro ao criar convite", error });
    }
  },
    getAll: async (req, res) => {
        try {
          const convite = await Convite.find();
          req.json(convite);
        } catch (error) {
          console.log(error);
        }
      },
      aceitarConvite: async (req, res) => {
        try {
          const { conviteId } = req.params;
    
          // Buscar o convite pelo ID
          const convite = await Convite.findById(conviteId)
            .populate("usuarioDestinatario")
            .populate("timeRemetente")
            .populate("usuarioRemetente")
            .populate("torneio")
            .populate("timeDestinatario");
    
          if (!convite) {
            return res.status(404).json({ message: "Convite não encontrado" });
          }
    
          // Processamento de convite baseado no tipo de convite
          if (convite.tipoConvite === "usuario_para_time") {
            // Adicionar o usuário destinatário ao time
            const time = await Time.findById(convite.timeRemetente._id);
            if (!time) {
              return res.status(404).json({ message: "Time não encontrado" });
            }
    
            // Verificar se o usuário já faz parte do time comparando pelo _id
            const isAlreadyMember = time.userId.some(
              (user) => user._id === convite.usuarioDestinatario._id
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
            const time = await Time.findById(convite.timeDestinatario._id);
            if (!time) {
              return res.status(404).json({ message: "Time não encontrado" });
            }
            const torneio = await Torneio.findById(convite.torneio._id)
            if(!torneio) {
              return res.status(404).json({ message: "Torneio não encontrado" });
            }
            if (!Array.isArray(torneio.Participantes)) {
              return res.status(500).json({ message: "Campo Participantes não encontrado ou inválido no torneio" });
            }
            // Verificar se o time já está no torneio
            const isAlreadyInTournament = torneio.Participantes.some(
              (time) => time._id === convite.timeRemetente._id
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
      },    
      get: async (req, res) => {
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
      },
      delete: async (req, res) => {
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
      },
      update: async (req, res) => {
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
      },
    
}
export default conviteController;