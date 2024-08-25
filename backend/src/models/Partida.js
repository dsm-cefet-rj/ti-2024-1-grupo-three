import mongoose from "mongoose";
import { timeSchema } from "./Time.js";
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
    placar :{
      type: String,
      required: false
    }

    //para nome da partida, acho que dá pra acessar o time pelo id e buscar o nomeTime
  },
  { timestamps: true }
);

const Partida = mongoose.model("Partida", partidaSchema);
export { Partida, partidaSchema };
