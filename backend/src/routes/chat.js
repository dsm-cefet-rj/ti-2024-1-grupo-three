import express from "express";
import {createChat, getAllChats, getChatById, addMensagemToChat} from "../controllers/chatController.js";
import { checkToken } from "../middleware/Auth.js";

const chatRoutes = express.Router();

// Rotas para criar e obter todos os chats
chatRoutes.post("/chat", createChat); // Criação de um novo chat
chatRoutes.get("/chat", getAllChats); // Obtenção de todos os chats

// Rotas para operações em um chat específico (obter e adicionar mensagens)
chatRoutes.get("/chat/:id", getChatById); // Obtenção de um chat específico
chatRoutes.post("/chat/:id", addMensagemToChat); // Adicionar mensagem a um chat específico


export default chatRoutes;
