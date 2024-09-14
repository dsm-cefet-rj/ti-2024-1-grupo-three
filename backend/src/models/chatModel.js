import mongoose from "mongoose";
import { mensagemSchema } from "./mensagemModel.js";
const {Schema} = mongoose;
const chatSchema = new Schema ({
    mensagens:[{
        type: mensagemSchema
    }]

},
{timestamps: true}
)
const chatModel = mongoose.model("Chat", chatSchema);

export {chatModel, chatSchema};