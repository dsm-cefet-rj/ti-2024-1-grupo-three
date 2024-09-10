import mongoose from "mongoose";
import { userSchema } from "./User.js";
const {Schema} = mongoose;
const mensagemSchema = new Schema ({
    usuario:{
        type:userSchema,
        required: true
    },
    mensagem:{
        type:String,
        required: true
    }
},
{timestamps: true}
)
const Mensagem = mongoose.model("Mensagem", mensagemSchema);
export {Mensagem, mensagemSchema};