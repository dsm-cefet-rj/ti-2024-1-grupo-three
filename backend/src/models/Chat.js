import mongoose from "mongoose";
import { mensagemSchema } from "./Mensagem.js";
const {Schema} = mongoose;
const chatSchema = new Schema ({
    mensagens:[{
        type: mensagemSchema
    }]

},
{timestamps: true}
)
const Chat = mongoose.model("Chat", chatSchema);
export {Chat, chatSchema};