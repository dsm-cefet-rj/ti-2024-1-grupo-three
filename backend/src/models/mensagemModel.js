import mongoose from "mongoose";
import { userSchema } from "./userModel.js";
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
const mensagemModel = mongoose.model("Mensagem", mensagemSchema);

export {mensagemModel, mensagemSchema};