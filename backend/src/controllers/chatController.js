import { Chat } from "../models/Chat.js";
import { Mensagem } from "../models/Mensagem.js";
import { User } from "../models/User.js";

const chatController = {
  // Criar um novo chat
  createChat: async (req, res) => {
    try {
      const novoChat = new Chat({
        mensagens: [],
      });
      await novoChat.save();
      res.status(201).json({ novoChat, msg: "Chat criado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar o chat", error });
    }
  },

  // Obter todos os chats
  getAllChats: async (req, res) => {
    try {
      const chats = await Chat.find().populate("mensagens.usuario");
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ message: "Erro ao obter os chats", error });
    }
  },

  // Obter um chat específico por ID
  getChatById: async (req, res) => {
    try {
      const { id } = req.params;
      const chat = await Chat.findById(id).populate("mensagens.usuario");

      if (!chat) {
        return res.status(404).json({ message: "Chat não encontrado" });
      }

      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: "Erro ao obter o chat", error });
    }
  },

  // Adicionar uma nova mensagem a um chat específico
  addMensagemToChat: async (req, res) => {
    try {
      const { id } = req.params;
      const { usuario, mensagem } = req.body;
      const user = await User.findById(usuario);
      if(!user){
        return res.status(404).json({message : "Usuário, que enviou a mensagem, não encontrado"})
      }
      // Criar uma nova mensagem
      const novaMensagem = new Mensagem({
        usuario: user,
        mensagem,
      });

      // Adicionar a mensagem ao chat
      const chat = await Chat.findById(id);
      if (!chat) {
        return res.status(404).json({ message: "Chat não encontrado" });
      }

      chat.mensagens.push(novaMensagem);
      await chat.save();

      res.status(201).json({ novaMensagem, msg: "Mensagem adicionada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar a mensagem ao chat", error });
    }
  },
};

export default chatController;
