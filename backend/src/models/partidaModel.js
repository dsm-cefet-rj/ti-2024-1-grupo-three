import mongoose from "mongoose";
import { timeSchema } from "./timeModel.js";
const { Schema } = mongoose;
const partidaSchema = new Schema(
  {
    timeMandante : {
      type: timeSchema,
      required: true
    },
    timeVisitante : {
      type: timeSchema,
      required: true
    },
    data:{
      type: String,
      required: true
    }, 
    local:{
      type: String,
      required: true
    },
    placar :{
      type: String,
      required: false
    }

    //para nome da partida, acho que dá pra acessar o time pelo id e buscar o nomeTime
  },
  { timestamps: true }
);

const partidaModel = mongoose.model("Partida", partidaSchema);

export { partidaModel, partidaSchema };
