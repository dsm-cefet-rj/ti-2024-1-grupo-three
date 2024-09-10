import express from "express";
import chatController from "../controllers/chatController.js";

const chatRoutes = express.Router();

// Rotas para criar e obter todos os chats
chatRoutes
  .route("/chat")
  .post(chatController.createChat)  // Criação de um novo chat
  .get(chatController.getAllChats); // Obtenção de todos os chats

// Rotas para operações em um chat específico (obter e adicionar mensagens)
chatRoutes
  .route("/chat/:id")
  .get(chatController.getChatById)      // Obtenção de um chat específico
  .post(chatController.addMensagemToChat); // Adicionar mensagem a um chat específico

export default chatRoutes;
